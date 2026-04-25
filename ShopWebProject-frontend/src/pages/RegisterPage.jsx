import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './RegisterPage.css';

function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await AuthService.register(username, email, password, confirmPassword);
      navigate('/login');
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <div className='register-container'>

      <form className='register-card' onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <div className='form-group'>
          <label>Username</label>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='register-btn'>
          Register
        </button>

        <p className='login-link'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>

      </form>

    </div>
  );
}

export default RegisterPage;