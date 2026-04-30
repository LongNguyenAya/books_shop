const AuthService = require('../services/AuthService');

class AuthController {
    // [POST] /api/auth/login
    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);
            res.json(result);
        } catch(error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    // [POST] /api/auth/register
    async register(req, res) {
        try {
            const result = await AuthService.register(req.body);
            res.json(result);
        } catch(error) {
            console.error(error);
            res.status(400).json({ error: error.message });
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
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();