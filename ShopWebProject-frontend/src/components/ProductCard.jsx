import './ProductCard.css';

function ProductCard({ product }) {
  const stockCount = product.quantity ?? 0;
  const stockLabel = stockCount > 0 ? `${stockCount} in stock` : 'Out of stock';

  return (
    <div className='product-card'>
      <div className='product-image'>
        <img src={product.imageurl} alt={product.productname} />
      </div>

      <div className='product-info'>
        <h3 className='product-name'>{product.productname}</h3>
        <p className='product-description'>{product.description}</p>

        <div className='product-meta'>
          <p className='product-price'>${product.price}</p>
          <span className={`product-stock ${stockCount > 0 ? 'available' : 'sold-out'}`}>
            {stockLabel}
          </span>
        </div>

        <button className='add-btn'>Add to cart</button>
      </div>

    </div>
  );
}

export default ProductCard;