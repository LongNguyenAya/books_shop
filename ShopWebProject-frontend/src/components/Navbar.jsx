import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLogin, logout } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Brand Logo */}
        <NavLink to='/' className='navbar-brand'>
          BookWorms
        </NavLink>

        {/* Navigation Links */}
        <div className='navbar-menu'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Home
          </NavLink>
          <NavLink to='/marketplace' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Products
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            About Us
          </NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Contact Us
          </NavLink>
          <NavLink to='/cart' className='navbar-link cart-link'>
            Cart
            <span className='cart-icon'>🛒</span>
          </NavLink>
        </div>

        {/* Actions */}
        <div className='navbar-auth'>
          {isLogin ? (
            <div className='user-menu'>
              <NavLink to='/profile' className='user-button'>Profile</NavLink>
              <button onClick={logout} className='logout-button'>Logout</button>
            </div>
          ) : (
            <>
              <NavLink to='/login' className='login-button'>Login</NavLink>
              <NavLink to='/register' className='register-button'>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;