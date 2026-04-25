const UserService = require('../services/UserService');

class UserController {
    // [GET] /api/users/email/:email
    async findUserByEmail(req, res) {
        const email = req.params.email;
        try {
            const user = await UserService.findUserByEmail(email);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: 'Cant find user' });
        }
    }

    // [PATCH] /api/users/me/avatar
    async uploadAvatar(req, res) {
        const userid = req.user.id;
        const file = req.file;
        try {
            const user = await UserService.uploadAvatar(userid, file);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: 'Cant update avatar' });
        }
    }

    // [GET] /api/users/me
    async findUserById(req, res) {
        const userid = req.user.id;
        try {
            const user = await UserService.findUserById(userid);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: 'Cant find user' });
        }
    }

    // [PATCH] /api/users/me
    async updateProfile(req, res) {
        const userid = req.user.id;
        const { username } = req.body;

        try {
            const user = await UserService.updateProfile(userid, username);
            res.json(user);
        } catch(error) {
            res.status(400).json({ error: 'Cant update profile' });
        }
    }

    // [GET] /api/users/total
    async totalRegisteredUsers(req, res) {
        try {
            const total = await UserService.totalRegisteredUsers();
            res.json({ total });
        } catch(error) {
            res.status(400).json({ error: 'Cant calculate total registered users' });
        }
    }
}

module.exports = new UserController();