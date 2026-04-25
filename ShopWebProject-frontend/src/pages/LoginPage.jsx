import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await AuthService.login(email, password, remember);
      login(result.token);
      if (result.role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }
      navigate('/');
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className='login-container'>

      <form className='login-card' onSubmit={handleSubmit}>

        <h2>Login</h2>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='login-options'>
          <label>
            <input
              type='checkbox'
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
        </div>

        <button type='submit' className='login-btn'>
          Login
        </button>

        <p className='register-link'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>

      </form>

    </div>
  );
}

export default LoginPage;