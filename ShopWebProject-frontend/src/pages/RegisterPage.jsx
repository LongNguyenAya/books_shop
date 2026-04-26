import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(username, email, password, confirmPassword);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <Link to="/" className="brand-name">
          BookWorms
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
          <div className="quote-overlay">
            <blockquote className="quote-text">
              "A room without books is like a body without a soul."
            </blockquote>
            <cite className="quote-author">— Cicero</cite>
          </div>
        </div>

        {/* Right: Register Form */}
        <div className="register-form-panel">
          <div className="register-form-inner">
            <p className="form-eyebrow">MEMBERSHIP REGISTRATION</p>
            <h1 className="register-title">Create Your Archive</h1>
            <p className="register-subtitle">Join our curated community of bibliophiles and scholars.</p>

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

              <button type="submit" className="register-btn">REGISTER ACCOUNT</button>
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