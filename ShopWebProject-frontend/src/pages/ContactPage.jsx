import { useState, useEffect } from 'react';
import './ContactPage.css';
import ContactRequestService from '../services/ContactRequestService';
import UserService from '../services/UserService';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await UserService.getUserProfile();
        setName(userData.username);
        setEmail(userData.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await ContactRequestService.createContactRequest(
        name.trim(),
        email.trim(),
        message.trim()
      );
      
      setShowSuccess(true);
      setMessage('');
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact request:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact-page' className='contact-page'>
      <div className='contact-page__container'>
        <div className='contact-card'>
          <div className='contact-card__hero'>
            <h1>Liên hệ với chúng tôi</h1>
            <p>Có câu hỏi, phản hồi, hoặc cần trợ giúp với một đơn hàng? Gửi cho chúng tôi một tin nhắn và chúng tôi sẽ sớm phản hồi bạn.</p>
          </div>

          {showSuccess && (
            <div className='success-message'>
              <div className='success-icon'>✓</div>
              <h3>Tin nhắn đã được gửi!</h3>
              <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.</p>
            </div>
          )}

          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <label htmlFor='name'>Họ và tên</label>
              <input 
                id='name' 
                type='text' 
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className='form-row'>
              <label htmlFor='email'>Email</label>
              <input 
                id='email' 
                type='email' 
                placeholder='Your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='form-row'>
              <label htmlFor='message'>Tin nhắn</label>
              <textarea
                id='message'
                placeholder='Viết tin nhắn của bạn ở đây...'
                rows='8'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button 
              type='submit' 
              className='btn-submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
