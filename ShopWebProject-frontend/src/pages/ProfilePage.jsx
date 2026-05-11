import { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './ProfilePage.css';
import UserService from '../services/UserService';

function ProfilePage() {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState(''); 
  const [ avatar, setAvatar ] = useState(null);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editName, setEditName ] = useState('');
  const [ editAvatar, setEditAvatar ] = useState(null);
  const [ selectedImageUrl, setSelectedImageUrl ] = useState(null);
  const [ crop, setCrop ] = useState({ x: 0, y: 0 });
  const [ zoom, setZoom ] = useState(1);
  const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

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

  useEffect(() => {
    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImageUrl]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(name);
  };

  const createImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  };

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const clearCropState = () => {
    setEditAvatar(null);
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    setSelectedImageUrl(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await UserService.updateProfile({ username: editName });
      setName(updatedUser.username);
      setEditName(updatedUser.username);

      if (editAvatar && selectedImageUrl && croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(selectedImageUrl, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], editAvatar.name, { type: editAvatar.type });
        const res = await UserService.uploadAvatar(croppedFile);
        setAvatar(res.avatarurl + '?t=' + Date.now());
      } else if (editAvatar) {
        const res = await UserService.uploadAvatar(editAvatar);
        setAvatar(res.avatarurl + '?t=' + Date.now());
      }

      setIsEditing(false);
      clearCropState();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    clearCropState();
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                      return;
                    }
                    setEditAvatar(file);
                    const previewUrl = URL.createObjectURL(file);
                    setSelectedImageUrl(previewUrl);
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                    setCroppedAreaPixels(null);
                  }}
                />
                {editAvatar && <p className='file-selected'>{editAvatar.name}</p>}
              </div>

              {selectedImageUrl && (
                <div className='cropper-panel'>
                  <div className='cropper-container'>
                    <Cropper
                      image={selectedImageUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape='round'
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  <div className='cropper-slider'>
                    <label htmlFor='zoom-range'>Zoom</label>
                    <input
                      id='zoom-range'
                      type='range'
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />
                  </div>

                  <p className='cropper-note'>Drag the image to adjust the crop area. The final avatar will be cut as a square.</p>
                </div>
              )}
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