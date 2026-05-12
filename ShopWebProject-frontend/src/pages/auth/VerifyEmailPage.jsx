import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './VerifyEmailPage.css';
import AuthService from '../../services/AuthService';

function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid verification link.');
        setIsLoading(false);
        return;
      }

      try {
        const result = await AuthService.verifyEmail(token);
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        const errorMsg = error.message || 'Verification failed. Please try again.';
        if (errorMsg.toLowerCase().includes('already')) {
          setMessage('Your email has already been verified. Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage(errorMsg);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className='verify-email-page'>
      <div className='verify-email-container'>
        <div className='verify-email-card'>
          <div className='verify-email-header'>
            <h1>Verifying Your Email</h1>
            {isLoading ? (
              <p>Please wait while we verify your email address...</p>
            ) : (
              <p>{message}</p>
            )}
          </div>

          {isLoading && (
            <div className='loading-spinner'>
              <div className='spinner'></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;