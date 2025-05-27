import { User } from '../../types/auth';

// Mock API for profile service
export const getUserProfile = async (): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock user data
  return {
    id: '1',
    name: 'Test Tutor',
    email: 'tutor@example.com',
    role: 'tutor'
  };
};

export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would update the user data in the database
  // For now, just return the updated user data
  return {
    id: '1',
    name: userData.name || 'Test Tutor',
    email: userData.email || 'tutor@example.com',
    role: 'tutor'
  };
};

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export const changeUserPassword = async (data: ChangePasswordRequest): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock validation
  if (data.currentPassword !== 'password') {
    throw new Error('Current password is incorrect');
  }
  
  // In a real app, this would update the password in the database
  console.log('Password changed successfully');
};
