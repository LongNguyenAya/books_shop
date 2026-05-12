import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductService from '../../services/ProductService';
import './MarketplacePage.css';

function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jumpPage, setJumpPage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    setPage(1); // Reset to first page when search term changes
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        if (searchTerm.trim()) {
          data = await ProductService.searchProducts(searchTerm.trim(), page);
        } else {
          data = await ProductService.showProducts(page);
        }
        setProducts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setTotalPages(1);
      }
    };
    fetchProducts();
  }, [page, searchTerm]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return result;
  }, [products, sortOrder]);

  return (
    <div className='marketplace-root'>
      {/* Hero Section */}
      <section className='marketplace-hero'>
        <h1 className='marketplace-title'>Kho Sách</h1>
        <p className='marketplace-subtitle'>Hãy chọn lựa những cuốn sách yêu thích của bạn.</p>
        <div className='marketplace-searchbar'>
          <input
            type='text'
            placeholder='Tìm kiếm trong bộ sưu tập...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className='material-symbols-outlined'>Tìm kiếm</span>
        </div>
        <div className='marketplace-controls'>
          <div className='sort-group'>
            <label htmlFor='sort'>Phân loại</label>
            <select id='sort' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value='default'>Mặc định</option>
              <option value='price-asc'>Giá: Thấp đến Cao</option>
              <option value='price-desc'>Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className='marketplace-product-list'>
        {filteredProducts.length === 0 ? (
          <div className='empty-state'>Không tìm thấy sản phẩm nào.</div>
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
          <span className='material-symbols-outlined'>&larr;</span>
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
          <span className='material-symbols-outlined'>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

export default MarketplacePage;