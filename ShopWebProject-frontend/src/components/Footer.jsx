import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-main'>
          {/* Brand Section */}
          <div className='footer-brand'>
            <NavLink to='/' className='footer-logo'>
              Ink & Archive
            </NavLink>
            <p className='footer-description'>
              A curated digital archive for readers who cherish the tactile weight of a well-bound book and the intellectual depth of a classic narrative.
            </p>
            <div className='footer-social'>
              <a className='social-link' href='#' aria-label='Books'>📚</a>
              <a className='social-link' href='#' aria-label='Share'>📤</a>
              <a className='social-link' href='#' aria-label='Email'>✉️</a>
            </div>
          </div>

          {/* Links Section */}
          <div className='footer-links'>
            <div className='footer-column'>
              <h4 className='footer-heading'>Shop</h4>
              <ul className='footer-list'>
                <li><NavLink to='/marketplace' className='footer-link'>New Arrivals</NavLink></li>
                <li><NavLink to='/marketplace' className='footer-link'>Best Sellers</NavLink></li>
                <li><NavLink to='/marketplace' className='footer-link'>Rare Editions</NavLink></li>
                <li><NavLink to='/marketplace' className='footer-link'>Gift Cards</NavLink></li>
              </ul>
            </div>

            <div className='footer-column'>
              <h4 className='footer-heading'>Assistance</h4>
              <ul className='footer-list'>
                <li><NavLink to='/contact' className='footer-link'>Contact Information</NavLink></li>
                <li><NavLink to='/contact' className='footer-link'>Privacy Policy</NavLink></li>
                <li><NavLink to='/contact' className='footer-link'>Shipping & Returns</NavLink></li>
                <li><NavLink to='/contact' className='footer-link'>Terms of Service</NavLink></li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className='footer-contact'>
            <h4 className='footer-heading'>Visit Us</h4>
            <p className='contact-address'>
              1248 Library Way,<br/>
              Historical District, Old Town
            </p>
            <p className='contact-email'>hello@inkandarchive.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className='footer-copyright'>
          <p>© 2024 Ink & Archive. Curated for the Discerning Reader.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;