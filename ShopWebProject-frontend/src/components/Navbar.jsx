import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

import homeIcon from '../assets/icons/home.png';
import marketplaceIcon from '../assets/icons/marketplace.png';
import cartIcon from '../assets/icons/shopping-cart.png';
import userIcon from '../assets/icons/user.png';

function Navbar() {
  const { isLogin, logout } = useContext(AuthContext);

  return (
    <nav className='navbar'>    
      <div className='menu'>
        <NavLink to='/'>
          <img src={homeIcon} alt='home' title='Home'/>
        </NavLink>
        <NavLink to='/marketplace'>
          <img src={marketplaceIcon} alt='marketplace' title='Marketplace'/>
        </NavLink>
        <NavLink to='/cart'>
          <img src={cartIcon} alt='cart' title='Cart'/>
        </NavLink>
      </div>

      <div className='auth'>
        {isLogin ? (
          <>
            <div className='user'>
              <div className='user-trigger'><img src={userIcon} alt='user'/></div>

              <div className='dropdown'>
                <NavLink to='/profile'>Me</NavLink>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </> 
          ) : (
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register' className='register'>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;