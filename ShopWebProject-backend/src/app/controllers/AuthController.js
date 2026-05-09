require('dotenv').config();
const AuthService = require('../services/AuthService');

class AuthController {
    // [POST] /api/auth/login
    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            res.json(result);
        } catch(error) {
            console.error(error);
            const status = error.status || 400;
            res.status(status).json({ message: error.message });
        }
    }

    // [POST] /api/auth/register
    async register(req, res) {
        try {
            const result = await AuthService.register(req.body);
            res.json(result);
        } catch(error) {
            console.error(error);
            const status = error.status || 400;
            res.status(status).json({ message: error.message });
        }
    }

    // [PATCH] /api/auth/reset-password
    async resetPassword(req, res) {
        const { email, newPassword, confirmNewPassword } = req.body;
        try {
            const result = await AuthService.resetPassword(email, newPassword, confirmNewPassword);
            res.json(result);
        } catch(error) {
            console.error(error);
            const status = error.status || 400;
            res.status(status).json({ message: error.message });
        }
    }

    // [GET] /api/auth/verify-email?token=...
    async verifyEmail(req, res) {
        const { token } = req.query;
        try {
            await AuthService.verifyEmail(token);
            return res.status(200).json({ message: 'Email verified successfully' });
        } catch(error) {
            console.error(error);
            const status = error.status || 400;
            const code = error.code || null;
            res.status(status).json({ message: error.message, code });
        }
    }
}

module.exports = new AuthController();