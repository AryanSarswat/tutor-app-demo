import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { changeUserPassword } from '../../services/profile/profileService';
import './ChangePasswordForm.css';

interface ChangePasswordFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSuccess, onError }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ChangePasswordFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const newPassword = watch('newPassword', '');

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      onError('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await changeUserPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      
      reset();
      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError('Failed to change password');
      }
      console.error('Error changing password:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="change-password-form">
      <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          id="currentPassword"
          type="password"
          {...register('currentPassword', { 
            required: 'Current password is required'
          })}
          className={errors.currentPassword ? 'input-error' : ''}
        />
        {errors.currentPassword && <span className="error-message">{errors.currentPassword.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          {...register('newPassword', { 
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'New password must be at least 6 characters'
            }
          })}
          className={errors.newPassword ? 'input-error' : ''}
        />
        {errors.newPassword && <span className="error-message">{errors.newPassword.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input
          id="confirmNewPassword"
          type="password"
          {...register('confirmNewPassword', { 
            required: 'Please confirm your new password',
            validate: value => value === newPassword || 'Passwords do not match'
          })}
          className={errors.confirmNewPassword ? 'input-error' : ''}
        />
        {errors.confirmNewPassword && <span className="error-message">{errors.confirmNewPassword.message}</span>}
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="change-password-submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Changing Password...' : 'Change Password'}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
