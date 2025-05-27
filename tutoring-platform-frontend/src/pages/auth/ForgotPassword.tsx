import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import { ForgotPasswordData } from '../../types/auth';
import './AuthForms.css';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>();
  const { forgotPasswordRequest, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsSubmitting(true);
    clearError();
    
    try {
      await forgotPasswordRequest(data);
      setIsSuccess(true);
    } catch (err) {
      console.error('Forgot password error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">Enter your email address and we'll send you a link to reset your password.</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        {isSuccess ? (
          <div className="auth-success">
            <p>Password reset link has been sent to your email address.</p>
            <p>Please check your inbox and follow the instructions to reset your password.</p>
            <Link to="/login" className="auth-button" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
              <Link to="/login" className="forgot-password-link">
                Back to Login
              </Link>
              
              <button 
                type="submit" 
                className="auth-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
