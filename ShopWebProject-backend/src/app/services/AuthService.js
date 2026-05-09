require('dotenv').config();
const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Resend } = require('resend');
const { v4: uuidv4 } = require('uuid');
const UserRepository = require('../repositories/UserRepository');

const resend = new Resend(process.env.RESEND_API_KEY);

class AuthService {
    // Xử lý đăng ký
    async register(data) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const {username, email, password, confirmPassword} = data;

            // Kiểm tra dữ liệu đã đầy đủ không
            if (!username || !email || !password || !confirmPassword) {
                throw new Error('Missing information');
            }

            // Kiểm tra lại password
            if (password !== confirmPassword) {
                throw new Error('Password and confirm password dont match');
            }

            // Kiểm tra email đã tồn tại chưa
            const existingUser = await UserRepository.findByEmailRepo(email, client);
            if (existingUser) {
                throw new Error('Email already exists');
            }
        
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo verify token
            const verify_token = uuidv4();
            const verify_token_expired = new Date(Date.now() + parseInt(process.env.TOKEN_EXPIRES) * 60 * 60 * 1000); // Token hết hạn sau 1 giờ
            
            // Lưu user mới
            const newUser = await UserRepository.createRepo(
                username,
                hashedPassword,
                email,
                verify_token,
                verify_token_expired,
                client
            );

            await this.sendVerifyEmail(email, username, verify_token);

            await client.query('COMMIT');

            return {
                id: newUser.userid,
                username: newUser.username,
                email: newUser.email
            }
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
        
    }

    // Xử lý đăng nhập (login)
    async login(data) {
        const {email, password} = data;

        // Kiểm tra dữ liệu đã đầy đủ không
        if (!email || !password) {
            throw new Error('Missing information');
        }

        const user = await UserRepository.findByEmailRepo(email);

        // Kiểm tra tài khoản có tồn tại không
        if (!user) {
            throw new Error('This email isnt registed!');
        }

        // Kiểm tra user đã verify email chưa và có active không (tránh trường hợp user bị khóa nhưng vẫn login được)
        if (!user.email_verified) {
            throw { status: 403, message: 'Please verify your email before logging in', code: 'EMAIL_NOT_VERIFIED' }
        }
        if (!user.is_active) {
            throw { status: 403, message: 'User is not active' }
        }

        // Kiểm tra password 
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new Error('Invalid password!')
        }

        // Tạo token
        const payload = {
            id: user.userid,
            role: user.role
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        )
            
        return { token };
    }

    // Xử lý quên mật khẩu
    async resetPassword(email, newPassword, confirmNewPassword) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Kiểm tra dữ liệu đã đầy đủ không
            if (!email || !newPassword || !confirmNewPassword) {
                throw new Error('Missing information');
            }

            // Kiểm tra email có tồn tại không
            const user = await UserRepository.findByEmailRepo(email, client);
            if (!user) {
                throw new Error('Email not found');
            }

            // Kiểm tra mật khẩu mới
            if (newPassword !== confirmNewPassword) {
                throw new Error('New password and confirm new password dont match');
            }

            // Hash mật khẩu mới
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu
            await UserRepository.updatePassword(email, hashedNewPassword, client);

            await client.query('COMMIT');

            return { message: 'Password changed successfully' };
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async verifyEmail(token) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const user = await UserRepository.findUserByVerifyToken(token)
        
            if (!user) {
                throw { status: 400, message: 'Token does not exist' }
            }
            if (user.email_verified) {
                throw { status: 400, message: 'Account already verified', code: 'ALREADY_VERIFIED' }
            }
            if (new Date() > new Date(user.verify_token_expired)) {
                throw { status: 400, message: 'Token has expired, please request to resend the verification email', code: 'TOKEN_EXPIRED' }
            }
            
            await UserRepository.markEmailAsVerified(user.userid)

            await client.query('COMMIT');
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // Verify email (dùng cho email verification và resend verification)
    async sendVerifyEmail(email, username, verify_token) {
        const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${verify_token}`;

        try {
            await resend.emails.send({
                from: process.env.RESEND_FROM,
                to: email,
                subject: 'Verify your email',
                html: `
                    <p>Hi ${username},</p>
                    <p>Please click the link below to verify your email:</p>
                    <a href="${verifyLink}" target="_blank">Verify Email</a>
                    <p>This link will expire in 1 hour.</p>
                `
            });
        } catch(error) {
            console.log(`Error sending verification email: ${error}`);
            throw error;
        }
    }
}

module.exports = new AuthService();