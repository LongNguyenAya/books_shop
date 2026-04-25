class ProductService {
    async showProducts(page = 1) {
        const res = await fetch(`http://localhost:3000/api/products?page=${page}&limit=15`, {
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

    async createProduct(product) {
        const res = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Create product failed');
        return data;
    }

    async updateProduct(id, product) {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Update product failed');
        return data;
    }

    async deleteProduct(id) {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Delete product failed');
        return data;
    }

    async totalProducts() {
        const res = await fetch('http://localhost:3000/api/products/total', {
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
}

export default new ProductService();