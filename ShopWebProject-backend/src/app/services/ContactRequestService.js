const ContactRequestRepository = require('../repositories/ContactRequestRepository');

class ContactRequestService {
    async createContactRequest(userid, contactname, contactemail, message) {
        if (!contactname || !contactemail || !message) {
            throw new Error('Missing required fields');
        }
        
        const contactRequest = await ContactRequestRepository.createContactRequest(userid, contactname, contactemail, message);

        if (!contactRequest) {
            throw new Error('Failed to create contact request');
        }

        return contactRequest;
    }
}

module.exports = new ContactRequestService;