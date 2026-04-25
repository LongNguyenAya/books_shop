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
      console.log(data);

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
    <div className='products-page'>
      <header className='page-header'>
        <div>
          <p className='subtitle'>Khám phá sản phẩm mới nhất</p>
          <h1>Market</h1>
        </div>
        <div className='page-stats'>
          <span>{filteredProducts.length} sản phẩm được hiển thị</span>
        </div>
      </header>

      <div className='page-controls'>
        <div className='search-group'>
          <label htmlFor='search'>Tìm kiếm</label>
          <input
            id='search'
            type='text'
            placeholder='Nhập tên hoặc mô tả...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='sort-group'>
          <label htmlFor='sort'>Sắp xếp</label>
          <select id='sort' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value='default'>Mặc định</option>
            <option value='price-asc'>Giá: thấp đến cao</option>
            <option value='price-desc'>Giá: cao đến thấp</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className='empty-state'>Không tìm thấy sản phẩm phù hợp.</div>
      ) : (
        <div className='product-list'>
          {filteredProducts.map((p) => (
            <ProductCard key={p.productid} product={p} />
          ))}
        </div>
      )}

      <div className='pagination'>
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
      </div>
    </div>
  );
}

export default MarketplacePage;