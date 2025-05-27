import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/auth/AuthContext';
import { getUserProfile, updateUserProfile } from '../../services/profile/profileService';
import { User } from '../../types/auth';
import ChangePasswordForm from '../../components/auth/ChangePasswordForm';
import './Profile.css';

interface ProfileFormData {
  name: string;
  email: string;
}

const TutorProfile: React.FC = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUser(profileData);
        reset({
          name: profileData.name,
          email: profileData.email
        });
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const updatedUser = await updateUserProfile(data);
      setUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to current user data
    if (user) {
      reset({
        name: user.name,
        email: user.email
      });
    }
  };

  if (isLoading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Tutor Profile</h1>
        {!isEditing && !showPasswordForm && (
          <button 
            className="edit-profile-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && <div className="profile-error">{error}</div>}
      {successMessage && <div className="profile-success">{successMessage}</div>}

      {showPasswordForm ? (
        <div className="profile-section">
          <div className="section-header">
            <h2>Change Password</h2>
            <button 
              className="back-button"
              onClick={() => setShowPasswordForm(false)}
            >
              Back to Profile
            </button>
          </div>
          <ChangePasswordForm 
            onSuccess={() => {
              setShowPasswordForm(false);
              setSuccessMessage('Password changed successfully');
              // Clear success message after 3 seconds
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
            }}
            onError={(message) => setError(message)}
          />
        </div>
      ) : (
        <div className="profile-section">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="save-button" 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className="info-group">
                <label>Role</label>
                <p>Tutor</p>
              </div>
              <div className="profile-actions">
                <button 
                  className="change-password-button"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
