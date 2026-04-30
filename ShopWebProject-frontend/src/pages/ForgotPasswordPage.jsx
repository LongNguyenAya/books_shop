import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }
    await AuthService.resetPassword(email, newPassword, confirmNewPassword);
    alert('Password reset successfully!');
    navigate('/login');
  };

  return (
    <div className="forgot-page">
      <header className="forgot-header">
        <Link to="/" className="brand-name">
          BookWorms
        </Link>
      </header>

      <main className="forgot-main">
        {/* Left: Library Image + Quote */}
        <div className="forgot-visual">
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

        {/* Right: Forgot Password Form */}
        <div className="forgot-form-panel">
          <div className="forgot-form-inner">
            <h1 className="forgot-title">Reset Password</h1>
            <p className="forgot-subtitle">Enter your email and new password.</p>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="reader@bookworms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">NEW PASSWORD</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="reset-btn">RESET PASSWORD</button>
            </form>

            <div className="back-section">
              <Link to="/login" className="back-link">← BACK TO LOGIN</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage;