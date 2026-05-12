import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import bgImage from '../../assets/background-login-register.jpg';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await AuthService.resetPassword(email, newPassword, confirmNewPassword);
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.message || 'Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <main className="forgot-main">
        <div className="forgot-form-panel">
          <div className="forgot-form-inner">
            <h1 className="forgot-title">Tạo lại mật khẩu</h1>
            <p className="forgot-subtitle">Vui lòng nhập địa chỉ email và mật khẩu mới của bạn để nhận liên kết đặt lại mật khẩu.</p>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">EMAIL</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="reader@animeculture.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">MẬT KHẨU MỚI</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Điền mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="reset-btn" disabled={loading}>
                {loading ? 'ĐANG TẠO LẠI...' : 'TẠO LẠI MẬT KHẨU'}
              </button>
            </form>

            <div className="back-section">
              <Link to="/login" className="back-link">QUAY LẠI TRANG ĐĂNG NHẬP</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;