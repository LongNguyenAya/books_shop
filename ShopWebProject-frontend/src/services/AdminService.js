class AdminService {
    async getStats() {
        const [productsRes, usersRes] = await Promise.all([
            fetch('http://localhost:3000/api/products/total', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            fetch('http://localhost:3000/api/users/total', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        ]);

        const productsData = await productsRes.json();
        const usersData = await usersRes.json();

        if (!productsRes.ok || !usersRes.ok) {
            throw new Error('Failed to fetch stats');
        }

        return {
            totalProducts: productsData.total || 0,
            totalUsers: usersData.total || 0
        };
    }
}

export default new AdminService();