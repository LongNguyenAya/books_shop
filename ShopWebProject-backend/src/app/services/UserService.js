const cloudinary = require('../../config/cloudinary');
const UserRepository = require('../repositories/UserRepository');

class UserService {
    async findUserByEmail(email) {
        const user = await UserRepository.findByEmailRepo(email);
        return user;
    }

    async findUserById(userid) {
        const user = await UserRepository.getUserById(userid);
        return user;
    }

    async uploadAvatar(userid, file) {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'avatars' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            stream.end(file.buffer);
        });

        const avatarUrl = result.secure_url;

        return await UserRepository.updateAvatarImage(userid, avatarUrl);
    }

    async updateProfile(userid, username) {
        const user = await UserRepository.updateProfile(userid, username);
        return user;
    }

    async totalRegisteredUsers() {
        const total = await UserRepository.totalRegisteredUsers();
        return total;
    }
}

module.exports = new UserService();