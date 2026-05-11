class ContactRequestService {
    async createContactRequest(contactname, contactemail, message) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;  
        } 

        const res = await fetch('http://localhost:3000/api/contact-requests', {
            method: 'POST',
            headers,
            body: JSON.stringify({ 
                contactname, 
                contactemail,
                message 
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to create contact request');
        }

        return data;
    }
}

export default new ContactRequestService();