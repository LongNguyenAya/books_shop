class AuthService {
    // Xử lý đăng nhập 
    async login(email, password, remember) {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        // Xử lý phần remember
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', data.token);

        let role = null;
        try {
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            role = payload.role;
        } catch (err) {
            console.warn('Invalid token payload', err);
        }

        return { token: data.token, role };
    }

    // Xử lý đăng ký
    async register(username, email, password, confirmPassword) {
        if (!username || !email || !password || !confirmPassword) {
            throw new Error('Please input all information');
        }

        if (password !== confirmPassword) {
            throw new Error('Password and Confirm Password dont match');
        }

        const res = await fetch('http://localhost:3000/api/auth/register', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                username,
                email,
                password,
                confirmPassword
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }

    // Xử lý quên mật khẩu
    async resetPassword(email, newPassword, confirmNewPassword) {
        if (!email || !newPassword || !confirmNewPassword) {
            throw new Error('Please input all information');
        }

        const res = await fetch('http://localhost:3000/api/auth/reset-password', {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ 
                email,
                newPassword,
                confirmNewPassword
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }
}

export default new AuthService();