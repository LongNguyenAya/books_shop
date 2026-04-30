import { useState, useEffect } from 'react';
import './ProfilePage.css';
import UserService from '../services/UserService';

function ProfilePage() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState(''); 
  const [ avatar, setAvatar ] = useState(null);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editName, setEditName ] = useState('');
  const [ editAvatar, setEditAvatar ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await UserService.getUserProfile();

        setName(data.username);
        setEmail(data.email);
        setAvatar(data.avatarurl);
      } catch(error) {
        console.error('Failed to fetch user profile:', error);
        
        if(error.message === 'Unauthorized') {
          alert('Session expired. Please log in again.');
          Navigate('/login');
        }
      }
    }

    fetchUserProfile(); 
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(name);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await UserService.updateProfile({ username: editName });
      setName(updatedUser.username);
      setEditName(updatedUser.username);

      if (editAvatar) {
        const res = await UserService.uploadAvatar(editAvatar);
        setAvatar(res.avatarurl + '?t=' + Date.now());
      }

      setIsEditing(false);
      setEditAvatar(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAvatar(null);
    setEditName(name);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className='user-page'>
      {isEditing && (
        <div className='modal-overlay' onClick={handleOverlayClick}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>Edit Profile</h3>
              <button className='modal-close' onClick={handleCancel}>&times;</button>
            </div>

            <div className='modal-body'>
              <div className='form-group'>
                <label>Username</label>
                <input 
                  type='text' 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label>Avatar</label>
                <input 
                  type='file' 
                  accept='image/*'
                  onChange={(e) => setEditAvatar(e.target.files?.[0])}
                />
                {editAvatar && <p className='file-selected'>{editAvatar.name}</p>}
              </div>
            </div>

            <div className='modal-footer'>
              <button className='btn-secondary' onClick={handleCancel} disabled={isLoading}>Cancel</button>
              <button className='btn-primary' onClick={handleSaveClick} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className='spinner'></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className='user-hero'>
        <div className='profile-card'>
          <div className='avatar'>
            {avatar ? (
              <img className='avatar-img' src={avatar} alt='Avatar' />
            ) : (
              <span>{name ? name.charAt(0).toUpperCase() : 'U'}</span>
            )}
          </div>

          <div className='profile-info'>
            <p className='profile-role'>User Profile</p>
            <h1>{name}</h1>
            <p className='profile-email'>{email}</p>

            <div className='profile-meta'>
              <div>
                <strong>Member since</strong>
                <span>Jan 2024</span>
              </div>
              <div>
                <strong>Orders</strong>
                <span>24</span>
              </div>
            </div>

            <button className='btn-primary' onClick={handleEditClick}>
              Edit profile
            </button>

          </div>
        </div>

        <div className='user-stats'>
          <article>
            <p>Orders</p>
            <strong>24</strong>
          </article>
          <article>
            <p>Wishlist</p>
            <strong>12</strong>
          </article>
          <article>
            <p>Saved</p>
            <strong>8</strong>
          </article>
          <article>
            <p>Spent</p>
            <strong>$1.8K</strong>
          </article>
        </div>
      </section>

      <section className='user-content'>
        <div className='user-card'>
          <div className='card-header'>
            <h2>Account details</h2>
            <button className='btn-secondary'>Manage</button>
          </div>

          <div className='detail-grid'>
            <div>
              <span>Full name</span>
              <p>{name}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{email}</p>
            </div>
          </div>
        </div>

        <div className='user-card recent-orders'>
          <div className='card-header'>
            <h2>Recent orders</h2>
            <button className='btn-link'>View all</button>
          </div>

          <div className='order-list'>
            <div className='order-row'>
              <div>
                <strong>#1298</strong>
                <span>Wireless Speaker</span>
              </div>
              <p>Shipped</p>
            </div>
            <div className='order-row'>
              <div>
                <strong>#1321</strong>
                <span>Smart Watch</span>
              </div>
              <p>Processing</p>
            </div>
            <div className='order-row'>
              <div>
                <strong>#1356</strong>
                <span>Noise Cancelling Headset</span>
              </div>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;