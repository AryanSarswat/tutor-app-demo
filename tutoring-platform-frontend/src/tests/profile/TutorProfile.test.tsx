import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/auth/AuthContext';
import TutorProfile from '../../pages/profile/TutorProfile';
import { getUserProfile, updateUserProfile } from '../../services/profile/profileService';

// Mock the profile service
jest.mock('../../services/profile/profileService');

const mockGetUserProfile = getUserProfile as jest.MockedFunction<typeof getUserProfile>;
const mockUpdateUserProfile = updateUserProfile as jest.MockedFunction<typeof updateUserProfile>;

const renderTutorProfile = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <TutorProfile />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('TutorProfile Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockGetUserProfile.mockResolvedValue({
      id: '1',
      name: 'Test Tutor',
      email: 'tutor@example.com',
      role: 'tutor'
    });
    
    mockUpdateUserProfile.mockImplementation(async (userData) => ({
      id: '1',
      name: userData.name || 'Test Tutor',
      email: userData.email || 'tutor@example.com',
      role: 'tutor'
    }));
  });
  
  test('renders profile information correctly', async () => {
    renderTutorProfile();
    
    // Check loading state
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
    
    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('Tutor Profile')).toBeInTheDocument();
    });
    
    // Check if profile data is displayed
    expect(screen.getByText('Test Tutor')).toBeInTheDocument();
    expect(screen.getByText('tutor@example.com')).toBeInTheDocument();
    expect(screen.getByText('Tutor')).toBeInTheDocument();
    
    // Check if edit button is present
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
  
  test('allows editing profile information', async () => {
    renderTutorProfile();
    
    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('Tutor Profile')).toBeInTheDocument();
    });
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Profile'));
    
    // Check if form inputs are present
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    
    // Update form values
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
    
    // Submit form
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Check if updateUserProfile was called with correct data
    expect(mockUpdateUserProfile).toHaveBeenCalledWith({
      name: 'Updated Name',
      email: 'updated@example.com'
    });
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Profile updated successfully')).toBeInTheDocument();
    });
  });
  
  test('shows change password form when button is clicked', async () => {
    renderTutorProfile();
    
    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('Tutor Profile')).toBeInTheDocument();
    });
    
    // Click change password button
    fireEvent.click(screen.getByText('Change Password'));
    
    // Check if password form is displayed
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
  });
});
