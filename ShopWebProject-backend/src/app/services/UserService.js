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
        const user = await UserRepository.getUserById(userid);

        // Nếu có public_id cũ, hãy xóa nó trên Cloudinary trước
        if (user && user.avatar_public_id) {
            await cloudinary.uploader.destroy(user.avatar_public_id);
        }

        // Upload ảnh lên Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'anime_culture_website/avatars' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(file.buffer);
        });

        // Lưu cả URL và Public ID vào DB
        return await UserRepository.updateAvatarImage(userid, result.secure_url, result.public_id);
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