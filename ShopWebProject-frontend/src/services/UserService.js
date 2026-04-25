class UserService {
    async totalRegisteredUsers() {
        const res = await fetch('http://localhost:3000/api/users/total', {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }

    async getUserProfile() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const res = await fetch('http://localhost:3000/api/users/me', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }

    async updateProfile({ username }) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const res = await fetch('http://localhost:3000/api/users/me', {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || data.message || 'Failed to update profile');
        }

        return data;
    }

    async uploadAvatar(file) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }

        const formData = new FormData();
        formData.append('avatar', file);

        const res = await fetch('http://localhost:3000/api/users/me/avatar', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || data.message || 'Failed to upload avatar');
        }

        return data;
    }

}

export default new UserService();