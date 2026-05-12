import { NavLink } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const stockCount = product.quantity ?? 0;
  const stockLabel = stockCount > 0 ? `${stockCount} in stock` : 'Out of stock';

  return (
    <NavLink to={`/product/${product.slug}`} className='product-card'>
      <div className='product-image'>
        <img src={product.imageurl} alt={product.productname} />
      </div>

      <div className='product-info'>
        <h3 className='product-name'>{product.productname}</h3>
        <p className='product-description'>{product.description}</p>

        <div className='product-meta'>
          <p className='product-price'>{product.price}đ</p>
          <span className={`product-stock ${stockCount > 0 ? 'available' : 'sold-out'}`}>
            {stockLabel}
          </span>
        </div>

        <button className='add-btn'>Thêm vào giỏ hàng</button>
      </div>

    </NavLink>
  );
}

export default ProductCard;