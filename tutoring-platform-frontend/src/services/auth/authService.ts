import { LoginCredentials, RegisterCredentials, ForgotPasswordData, ResetPasswordData, User } from '../../types/auth';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Test Tutor',
  email: 'tutor@example.com',
  role: 'tutor'
};

// Mock token storage
export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

// Auth service functions
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API call
  await delay(800);
  
  // Mock validation
  if (credentials.email !== 'tutor@example.com' || credentials.password !== 'password') {
    throw new Error('Invalid email or password');
  }
  
  // Set mock token
  setToken('mock-jwt-token');
  
  return mockUser;
};

export const registerUser = async (credentials: RegisterCredentials): Promise<User> => {
  // Simulate API call
  await delay(1000);
  
  // Mock validation
  if (credentials.email === 'tutor@example.com') {
    throw new Error('Email already in use');
  }
  
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  // Set mock token
  setToken('mock-jwt-token');
  
  // Return mock user with provided name and email
  return {
    ...mockUser,
    name: credentials.name,
    email: credentials.email
  };
};

export const forgotPassword = async (data: ForgotPasswordData): Promise<void> => {
  // Simulate API call
  await delay(1000);
  
  // Mock validation
  if (data.email !== 'tutor@example.com') {
    throw new Error('Email not found');
  }
  
  // In a real app, this would send an email with a reset link
  console.log(`Password reset email sent to ${data.email}`);
};

export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  // Simulate API call
  await delay(1000);
  
  // Mock validation
  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  if (!data.token) {
    throw new Error('Invalid reset token');
  }
  
  // In a real app, this would verify the token and update the password
  console.log('Password reset successful');
};

export const getCurrentUser = async (): Promise<User | null> => {
  // Simulate API call
  await delay(500);
  
  // Check if token exists
  const token = getToken();
  
  if (!token) {
    return null;
  }
  
  // In a real app, this would validate the token and return the user data
  return mockUser;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  // Simulate API call
  await delay(800);
  
  // Mock validation
  if (currentPassword !== 'password') {
    throw new Error('Current password is incorrect');
  }
  
  // In a real app, this would update the password in the database
  console.log('Password changed successfully');
};
