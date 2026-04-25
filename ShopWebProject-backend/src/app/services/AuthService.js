require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');

class AuthService {
    // Xử lý đăng ký
    async register(data) {
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
        const existingUser = await UserRepository.findByEmailRepo(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Lưu user mới
        const newUser = await UserRepository.createRepo(
            username,
            hashedPassword,
            email
        )

        return {
            id: newUser.userid,
            username: newUser.username,
            email: newUser.email
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
        const isMatch = await bcrypt.compare(password, user.password);
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
}

module.exports = new AuthService();