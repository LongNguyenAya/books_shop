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
          AnimeCulture
        </NavLink>

        {/* Navigation Links */}
        <div className='navbar-menu'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Trang chủ
          </NavLink>
          <NavLink to='/marketplace' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Sản phẩm
          </NavLink>
          <NavLink to='/about' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Về chúng tôi
          </NavLink>
          <NavLink to='/contact' className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}>
            Liên hệ
          </NavLink>
          <NavLink to='/cart' className='navbar-link cart-link'>
            Giỏ hàng
          </NavLink>
        </div>

        {/* Actions */}
        <div className='navbar-auth'>
          {isLogin ? (
            <div className='user-menu'>
              <NavLink to='/profile' className='user-button'>Hồ sơ</NavLink>
              <button onClick={logout} className='logout-button'>Đăng xuất</button>
            </div>
          ) : (
            <>
              <NavLink to='/login' className='login-button'>Đăng nhập</NavLink>
              <NavLink to='/register' className='register-button'>Đăng ký</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;