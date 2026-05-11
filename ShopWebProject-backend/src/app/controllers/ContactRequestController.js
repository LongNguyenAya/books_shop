const ContactRequestService = require('../services/ContactRequestService');

class CotactRequestController {
    // [POST] /contact-requests
    async createContactRequest(req, res) {
        const { contactname, contactemail, message } = req.body;
        const userid = req.user ? req.user.id : null; // Lấy userId từ token nếu có, nếu không thì để null

        try {
            const contactRequest = await ContactRequestService.createContactRequest(userid, contactname, contactemail, message);
            res.status(201).json(contactRequest);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CotactRequestController;