import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import './DashboardPage.css';

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '', categoryid: '' });

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ProductService.showProducts(1);
      setProducts(data.data || data);
    } catch (err) {
      setError(err.message || 'Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setError('Name and price are required');
      return;
    }

    try {
      await ProductService.createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity) || 0,
        categoryid: form.categoryid || null
      });
      setForm({ name: '', description: '', price: '', quantity: '', categoryid: '' });
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to create product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await ProductService.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>This is a dedicated admin panel for product CRUD operations.</p>

      <div className="admin-widgets">
        <div className="widget">
          <h2>Manage Products</h2>
          <form className="product-form" onSubmit={handleCreate}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>
              Description
              <input name="description" value={form.description} onChange={handleChange} />
            </label>
            <label>
              Price
              <input type="number" name="price" value={form.price} onChange={handleChange} />
            </label>
            <label>
              Quantity
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
            </label>
            <label>
              Category ID
              <input name="categoryid" value={form.categoryid} onChange={handleChange} />
            </label>
            <button type="submit">Create Product</button>
          </form>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            )}
            {products.map((item) => (
              <tr key={item.productid || item.id || item._id}>
                <td>{item.productid || item.id || item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(item.productid || item.id || item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashboardPage;
