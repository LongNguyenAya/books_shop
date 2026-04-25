import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';

function HomePage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const data = await ProductService.totalProducts();
        setTotalProducts(data.total ?? data);
      } catch(error) {
        console.error('Failed to fetch total products:', error);
      }
    };

    const fetchTotalUsers = async () => {
      try {
        const data = await UserService.totalRegisteredUsers();
        setTotalUsers(data.total ?? data);
      } catch(error) {
        console.error('Failed to fetch total users:', error);
      }
    };
    
    fetchTotalProducts();
    fetchTotalUsers();
  }, []);

  return (
    <div className='home-page'>
      <section className='hero-section'>
        <div className='hero-copy'>
          <span className='hero-label'>Welcome to the ShopWeb project</span>
          <h1>This website will show you few amazing services</h1>
          <p>
            Having dashboard, product management, user profile, and authentication features. Explore the demo to see how it works!
          </p>

          <div className='hero-actions'>
            <NavLink to='/marketplace' className='btn-primary'>
              Shop Now
            </NavLink>
            <a href='#home-categories' className='btn-secondary'>Explore Categories</a>
          </div>

          <div className='hero-stats'>
            <div>
              <strong>{totalProducts}</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>{totalUsers}</strong>
              <span>Registered users</span>
            </div>
            <div>
              <strong>Free</strong>
              <span>Shipping</span>
            </div>
          </div>
        </div>

        <div className='hero-preview'>
          <div className='preview-card preview-card-large'>
            <span className='preview-label'>Trending</span>
            <h2>Minimalist Speaker</h2>
            <p>Elegant design, premium sound and compact size.</p>
            <div className='preview-price'>$129</div>
          </div>

          <div className='preview-widgets'>
            <div className='preview-card preview-card-small'>
              <h3>Best seller</h3>
              <p>Wireless earbuds</p>
            </div>
            <div className='preview-card preview-card-small alt'>
              <h3>Top rated</h3>
              <p>Smart watch</p>
            </div>
          </div>
        </div>
      </section>

      <section className='home-features'>
        <article>
          <h3>Fast delivery</h3>
          <p>Giao hàng nhanh trong 24h với nhiều lựa chọn vận chuyển.</p>
        </article>
        <article>
          <h3>Secure payment</h3>
          <p>Thanh toán an toàn qua nhiều hình thức phổ biến.</p>
        </article>
        <article>
          <h3>Easy returns</h3>
          <p>Đổi trả dễ dàng trong 7 ngày nếu không hài lòng.</p>
        </article>
      </section>

      <section id='home-categories' className='home-categories'>
        <div className='section-header'>
          <div>
            <span>Categories</span>
            <h2>Shop by category</h2>
          </div>
          <button className='btn-link'>View all</button>
        </div>

        <div className='category-grid'>
          <div className='category-card'>
            <span className='category-icon'>🛍️</span>
            <h4>Fashion</h4>
            <p>Trending outfits & accessories.</p>
          </div>
          <div className='category-card'>
            <span className='category-icon'>⌚</span>
            <h4>Gadgets</h4>
            <p>Smart devices for home and work.</p>
          </div>
          <div className='category-card'>
            <span className='category-icon'>🏡</span>
            <h4>Home</h4>
            <p>Décor, essentials and more.</p>
          </div>
          <div className='category-card'>
            <span className='category-icon'>🎁</span>
            <h4>Gift</h4>
            <p>Perfect finds for every occasion.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;