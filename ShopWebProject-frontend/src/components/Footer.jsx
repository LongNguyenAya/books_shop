import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import './Footer.css';
import facebookIcon from '../assets/logo/facebook.png';
import emailIcon from '../assets/logo/email.png';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-main'>
          {/* Brand Section */}
          <div className='footer-brand'>
            <NavLink to='/' className='footer-logo'>
              AnimeCulture
            </NavLink>
            <p className='footer-description'>
              Nơi hội tụ đam mê anime và manga, AnimeCulture mang đến cho bạn những sản phẩm độc đáo và chất lượng nhất. 
              Khám phá bộ sưu tập đa dạng từ các thương hiệu nổi tiếng và những món đồ hiếm có chỉ có tại chúng tôi. 
              Hãy để AnimeCulture trở thành điểm đến yêu thích của bạn trong thế giới anime!
            </p>
            <div className='footer-social'>
              <a className='social-link' href='https://www.facebook.com/LongHeHe2108/' aria-label='Facebook'>
                <img src={facebookIcon} alt='Facebook' className='social-icon' />
              </a>
              <a className='social-link' href='mailto:longdang1106@gmail.com' aria-label='Email'>
                <img src={emailIcon} alt='Email' className='social-icon' />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className='footer-links'>
            <div className='footer-column'>
              <h4 className='footer-heading'>Shop</h4>
              <ul className='footer-list'>
                <li><NavHashLink to='/#hero-section' className='footer-link'>AnimeCulture</NavHashLink></li>
                <li><NavHashLink to='/#featured-section' className='footer-link'>Bán chạy</NavHashLink></li>
                <li><NavHashLink to='/#offers-section' className='footer-link'>Mã giảm giá</NavHashLink></li>
              </ul>
            </div>

            <div className='footer-column'>
              <h4 className='footer-heading'>Assistance</h4>
              <ul className='footer-list'>
                <li><NavHashLink to='/contact#contact-page' className='footer-link'>Liên hệ</NavHashLink></li>
                <li><NavLink to='/about-us' className='footer-link'>Về chúng tôi</NavLink></li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className='footer-contact'>
            <h4 className='footer-heading'>Visit Us</h4>
            <p className='contact-email'>longdang1106@gmail.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className='footer-copyright'>
          <p>© 2026 AnimeCulture. Curated for the Discerning Otaku.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;