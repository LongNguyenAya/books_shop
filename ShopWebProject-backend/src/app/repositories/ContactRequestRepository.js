const pool = require('../../config/db');
const ContactRequest = require('../models/ContactRequest');

class ContactRequestRepository {
    async createContactRequest(userid, contactname, contactemail, message) {
        try {
            const result = await pool.query(
                `INSERT INTO contact_requests (userid, contactname, contactemail, message)
                VALUES ($1, $2, $3, $4)
                RETURNING *`,
                [userid, contactname, contactemail, message]
            );

            const row = result.rows[0];

            return new ContactRequest(
                row.contactid,
                row.userid,
                row.contactname,
                row.contactemail,
                row.message
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new ContactRequestRepository;