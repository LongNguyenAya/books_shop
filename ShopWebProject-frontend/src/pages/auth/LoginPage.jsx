import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AuthService from '../../services/AuthService';
import bgImage from '../../assets/background-login-register.jpg';
import './LoginPage.css';
import { NavLink } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const result = await AuthService.login(email, password, remember);
      login(result.token);
      if (result.role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }
      navigate('/');
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{
      backgroundImage: `url(${bgImage})`,
    }}>
      <main className="login-main">
        {/* Left: Library Image + Quote */}
        <div className="login-visual">
          <img
            src="/library.jpg"
            alt="Library"
            className="library-image"
          />
        </div>

        {/* Right: Login Form */}
        <div className="login-form-panel">
          <div className="login-form-inner">
            <NavLink to="/" className="login-title">
              AnimeCulture
            </NavLink>
            <p className="login-subtitle">Chào mừng bạn đã quay trở lại.</p>

            {error && <div className="error-message" style={{color: '#dc3545', marginBottom: '15px'}}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">EMAIL</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="reader@animeculture.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label className="field-label">MẬT KHẨU</label>
                  <Link to="/forgot-password" className="forgot-link">QUÊN MẬT KHẨU?</Link>
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
                  <span>Nhớ thiết bị này</span>
                </label>
              </div>

              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
              </button>
            </form>

            <div className="register-section">
              <p className="register-text">Là người mới ở AnimeCulture?</p>
              <Link to="/register" className="create-account-link">TẠO TÀI KHOẢN</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;