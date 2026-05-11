import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import bgImage from '../assets/background-login-register.jpg';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register(username, email, password, confirmPassword);
      setMessage('Registration successful! Please check your email to verify your account.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" style={{
      backgroundImage: `url(${bgImage})`
    }}>
      <header className="register-header">
        <Link to="/" className="brand-name">
          AnimeCulture
        </Link>
      </header>

      <main className="register-main">
        {/* Left: Library Image + Quote */}
        <div className="register-visual">
          <img
            src="/library-dark.jpg"
            alt="Library corridor"
            className="library-image"
          />
        </div>

        {/* Right: Register Form */}
        <div className="register-form-panel">
          <div className="register-form-inner">
            <p className="form-eyebrow">MEMBERSHIP REGISTRATION</p>
            <h1 className="register-title">Create Your Archive</h1>
            <p className="register-subtitle">Join our curated community of bibliophiles and scholars.</p>

            {error && <div className="error-message" style={{color: '#dc3545', marginBottom: '15px'}}>{error}</div>}
            {message && <div className="success-message" style={{color: '#28a745', marginBottom: '15px'}}>{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <input
                  type="text"
                  className="field-input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="field-group">
                <input
                  type="email"
                  className="field-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-row">
                <div className="field-group half">
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="field-group half">
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="terms-row" style={{marginBottom: '20px'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>I agree to the Terms & Conditions</span>
                </label>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? 'REGISTERING...' : 'REGISTER ACCOUNT'}
              </button>
            </form>

            <div className="login-section">
              <p className="login-text">
                Already have an account?{' '}
                <Link to="/login" className="login-here-link">LOGIN HERE</Link>
              </p>
            </div>

            <div className="trust-badges">
              <span className="badge">Verified Scholar</span>
              <span className="badge">Global Shipping</span>
              <span className="badge">Rare Collections</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;