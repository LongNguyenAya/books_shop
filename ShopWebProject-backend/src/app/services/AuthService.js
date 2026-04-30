require('dotenv').config();
const pool = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');

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
            
            // Lưu user mới
            const newUser = await UserRepository.createRepo(
                username,
                hashedPassword,
                email,
                client
            )

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

        // Kiểm tra tài khoản có tồn tại không 
        const user = await UserRepository.findByEmailRepo(email);
        if (!user) {
            throw new Error('This email isnt registed!');
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
        // Kiểm tra dữ liệu đã đầy đủ không
        if (!email || !newPassword || !confirmNewPassword) {
            throw new Error('Missing information');
        }

        // Kiểm tra mật khẩu mới
        if (newPassword !== confirmNewPassword) {
            throw new Error('New password and confirm new password dont match');
        }

        // Hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu
        await UserRepository.updatePassword(email, hashedNewPassword);
        return { message: 'Password changed successfully' };
    }
}

module.exports = new AuthService();