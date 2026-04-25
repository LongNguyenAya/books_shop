class CartService {
    async addProductToCart() {
        const res = await fetch('http://localhost:3000/api/products?page=${page}&limit=15', {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        return data;
    }
}

export default new CartService();