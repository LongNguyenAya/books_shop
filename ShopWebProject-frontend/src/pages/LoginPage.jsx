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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to="/" className="brand-name">
          BookWorms
        </Link>
      </header>

      <main className="login-main">
        {/* Left: Library Image + Quote */}
        <div className="login-visual">
          <img
            src="/library.jpg"
            alt="Library"
            className="library-image"
          />
          <div className="quote-overlay">
            <blockquote className="quote-text">
              "A room without books is like a body without a soul."
            </blockquote>
            <cite className="quote-author">— MARCUS TULLIUS CICERO</cite>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="login-form-panel">
          <div className="login-form-inner">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Continue your journey through the collection.</p>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="reader@bookworms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label className="field-label">PASSWORD</label>
                  <Link to="/forgot-password" className="forgot-link">FORGOT?</Link>
                </div>
                <input
                  type="password"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="remember-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    className="remember-checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button type="submit" className="signin-btn">SIGN IN</button>
            </form>

            <div className="register-section">
              <p className="register-text">New to BookWorms?</p>
              <Link to="/register" className="create-account-link">CREATE ACCOUNT</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;