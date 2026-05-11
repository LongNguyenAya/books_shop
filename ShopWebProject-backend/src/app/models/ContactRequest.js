class ContactRequest {
    constructor(contactid, userid, contactname, contactemail, message, status) {
        this.contactid = contactid;
        this.userid = userid;
        this.contactname = contactname;
        this.contactemail = contactemail;
        this.message = message;
        this.status = status;
    }
}

module.exports = ContactRequest;