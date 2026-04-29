import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import ProductService from '../services/ProductService';
import './MarketplacePage.css';

function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jumpPage, setJumpPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductService.showProducts(page);
      setProducts(data.data);
      setTotalPages(data.totalPages);
    };
    fetchProducts();
  }, [page]);

  const filteredProducts = useMemo(() => {
    let result = products;
    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((product) =>
        product.productname.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, searchTerm, sortOrder]);

  return (
    <div className='marketplace-root'>
      {/* Hero Section */}
      <section className='marketplace-hero'>
        <h1 className='marketplace-title'>The Archive Catalog</h1>
        <p className='marketplace-subtitle'>Curated volumes for the discerning reader and collector.</p>
        <div className='marketplace-searchbar'>
          <input
            type='text'
            placeholder='Search the collection...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className='material-symbols-outlined'>search</span>
        </div>
        <div className='marketplace-controls'>
          <div className='sort-group'>
            <label htmlFor='sort'>Sort by</label>
            <select id='sort' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value='default'>Default</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className='marketplace-product-list'>
        {filteredProducts.length === 0 ? (
          <div className='empty-state'>No products found.</div>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard key={p.productid} product={p} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className='marketplace-pagination'>
        <button
          className='pagination-arrow'
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          <span className='material-symbols-outlined'>chevron_left</span>
        </button>
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          if (pageNumber <= 3 || pageNumber === totalPages) {
            return (
              <button
                key={pageNumber}
                className={page === pageNumber ? 'active' : ''}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
          if (pageNumber === 4) {
            return (
              <input
                key='jump'
                className='jump-input'
                placeholder='...'
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const num = parseInt(jumpPage);
                    if (num >= 1 && num <= totalPages) {
                      setPage(num);
                    }
                    setJumpPage('');
                  }
                }}
              />
            );
          }
          return null;
        })}
        <button
          className='pagination-arrow'
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
        >
          <span className='material-symbols-outlined'>chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default MarketplacePage;