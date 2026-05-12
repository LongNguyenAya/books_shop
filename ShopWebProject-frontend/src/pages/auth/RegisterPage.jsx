import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import bgImage from '../../assets/background-login-register.jpg';
import './RegisterPage.css';
import { NavLink } from 'react-router-dom';

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
            <p className="form-eyebrow">TẠO TÀI KHOẢN</p>
            <NavLink to="/" className="register-title">
              AnimeCulture
            </NavLink>
            <p className="register-subtitle">Khám phá shop của chúng tôi.</p>

            {error && <div className="error-message" style={{color: '#dc3545', marginBottom: '15px'}}>{error}</div>}
            {message && <div className="success-message" style={{color: '#28a745', marginBottom: '15px'}}>{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <input
                  type="text"
                  className="field-input"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="field-group">
                <input
                  type="email"
                  className="field-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-row">
                <div className="field-group half">
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="field-group half">
                  <input
                    type="password"
                    className="field-input"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ TÀI KHOẢN'}
              </button>
            </form>

            <div className="login-section">
              <p className="login-text">
                Đã có tài khoản?{' '}
                <Link to="/login" className="login-here-link">ĐĂNG NHẬP TẠI ĐÂY</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;