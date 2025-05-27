import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import { ResetPasswordData } from '../../types/auth';
import './AuthForms.css';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordData>();
  const { resetPasswordRequest, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState<string>('');
  
  const password = watch('password', '');

  useEffect(() => {
    // Extract token from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      // If no token is provided, redirect to forgot password page
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const onSubmit = async (data: ResetPasswordData) => {
    setIsSubmitting(true);
    clearError();
    
    try {
      // Add token to form data
      await resetPasswordRequest({ ...data, token });
      setIsSuccess(true);
    } catch (err) {
      console.error('Reset password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter your new password below.</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        {isSuccess ? (
          <div className="auth-success">
            <p>Your password has been successfully reset.</p>
            <p>You can now login with your new password.</p>
            <Link to="/login" className="auth-button" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="auth-button" 
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
