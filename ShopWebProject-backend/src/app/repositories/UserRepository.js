const pool = require('../../config/db');
const User = require('../models/User');

class UserRepository {
    async findByEmailRepo(email) {
        try {
            const result = await pool.query(
                `SELECT userid, username, password, email, avatarurl, role
                FROM users
                WHERE email = $1`,
                [email]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User(
                row.userid, 
                row.username, 
                row.password, 
                row.email,
                row.avatarurl,
                row.role
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async createRepo(username, password, email) {
        try {
            const result = await pool.query(
                `INSERT INTO users(username, password, email)
                VALUES ($1,$2,$3)
                RETURNING *`,
                [username, password, email]
            );

            const row = result.rows[0];

            return new User(
                row.userid, 
                row.username, 
                row.password,
                row.email, 
                row.avatarurl,
                row.role
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async updateAvatarImage(userid, avatarurl) {
        try {
            const result = await pool.query(
                `UPDATE users
                SET avatarurl = $1,
                updatedat = NOW()
                WHERE userid = $2
                RETURNING *`,
                [avatarurl, userid]
            );

            const row = result.rows[0];

            if (result.rows.length === 0) {
                return null;
            }

            return new User(
                row.userid, 
                row.username, 
                row.password,
                row.email, 
                row.avatarurl,
                row.role
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async getUserById(userid) {
        try {
            const result = await pool.query(
                `SELECT userid, username, password, email, avatarurl, role
                FROM users
                WHERE userid = $1`,
                [userid]
            );

            const row = result.rows[0];

            if (result.rows.length === 0) {
                return null;
            }

            return new User(
                row.userid, 
                row.username, 
                row.password,
                row.email, 
                row.avatarurl,
                row.role
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async updateProfile(userid, username) {
        try {
            const result = await pool.query(
                `UPDATE users
                SET username = $1,
                    updatedat = NOW()
                WHERE userid = $2
                RETURNING userid, username, password, email, avatarurl, role`,
                [username, userid]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User(
                row.userid, 
                row.username, 
                row.password,
                row.email, 
                row.avatarurl,
                row.role
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async totalRegisteredUsers() {
        try {
            const result = await pool.query(
                `SELECT COUNT(*) AS total
                FROM users
                WHERE role = 'user'`
            );

            return parseInt(result.rows[0]?.total || 0, 10);
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new UserRepository();