const pool = require('../../config/db');
const User = require('../models/User');

class UserRepository {
    async findByEmailRepo(email, client=null) {
        try {
            const executor = client || pool;

            const result = await executor.query(
                `SELECT userid, username, password_hash, email, email_verified,
                verify_token, verify_token_expired, avatarurl, role, is_active, createdat, updatedat
                FROM users
                WHERE email = $1`,
                [email]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async createRepo(username, password, email, verify_token, verify_token_expired, client=null) {
        try {
            const executor = client || pool;

            const result = await executor.query(
                `INSERT INTO users(username, password_hash, email, verify_token, verify_token_expired)
                VALUES ($1,$2,$3,$4,$5)
                RETURNING *`,
                [username, password, email, verify_token, verify_token_expired]
            );

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
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

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async getUserById(userid) {
        try {
            const result = await pool.query(
                `SELECT userid, username, password_hash, email, email_verified, verify_token, verify_token_expired, avatarurl, role, is_active, createdat, updatedat
                FROM users
                WHERE userid = $1`,
                [userid]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
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
                RETURNING userid, username, password_hash, email, avatarurl, role, updatedat`,
                [username, userid]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                avatarurl: row.avatarurl,
                role: row.role,
                updatedat: row.updatedat
            });
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async updatePassword(email, password, client=null) {
        try {
            const executor = client || pool;
            
            const result = await executor.query(
                `UPDATE users
                SET password_hash = $1,
                    updatedat = NOW()
                WHERE email = $2
                RETURNING *`,
                [password, email]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                avatarurl: row.avatarurl,
                role: row.role,
                updatedat: row.updatedat
            });
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

    async findUserByVerifyToken(token, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `SELECT userid, username, password_hash, email, email_verified, verify_token, verify_token_expired, avatarurl, role, is_active, createdat, updatedat
                FROM users
                WHERE verify_token = $1`,
                [token]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async markEmailAsVerified(userid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `UPDATE users
                SET email_verified = true,
                    updatedat = NOW()
                WHERE userid = $1
                RETURNING *`,
                [userid]
            );

            if (result.rows.length === 0) {
                return null;
            }

            const row = result.rows[0];

            return new User({
                userid: row.userid,
                username: row.username,
                password_hash: row.password_hash,
                email: row.email,
                email_verified: row.email_verified,
                verify_token: row.verify_token,
                verify_token_expired: row.verify_token_expired,
                avatarurl: row.avatarurl,
                role: row.role,
                is_active: row.is_active,
                createdat: row.createdat,
                updatedat: row.updatedat
            });
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new UserRepository();