import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import { getStudents } from '../../services/student/studentService';

// Mock the student service
jest.mock('../../services/student/studentService');

const mockGetStudents = getStudents as jest.MockedFunction<typeof getStudents>;

// Mock navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockGetStudents.mockResolvedValue([
      {
        id: '1',
        name: 'John Smith',
        age: 15,
        grade: '10th',
        subjects: ['Math', 'Physics'],
        notes: 'Test notes',
        isArchived: false
      },
      {
        id: '2',
        name: 'Emma Johnson',
        age: 12,
        grade: '7th',
        subjects: ['English', 'History'],
        notes: 'Test notes',
        isArchived: false
      }
    ]);
  });
  
  test('renders dashboard correctly', async () => {
    renderDashboard();
    
    // Check if dashboard title is rendered
    expect(screen.getByText('Tutor Dashboard')).toBeInTheDocument();
    
    // Check if welcome message is displayed
    expect(screen.getByText(/Welcome, Test Tutor!/i)).toBeInTheDocument();
    
    // Check if loading message is displayed initially
    expect(screen.getByText(/Loading students/i)).toBeInTheDocument();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });
    
    // Check if student preview items are displayed
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
    
    // Check if quick actions are displayed
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getAllByText('Add New Student').length).toBeGreaterThan(0);
    expect(screen.getByText('View All Students')).toBeInTheDocument();
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });
  
  test('displays empty state when no students are available', async () => {
    // Mock empty students list
    mockGetStudents.mockResolvedValue([]);
    
    renderDashboard();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading students/i)).not.toBeInTheDocument();
    });
    
    // Check if empty state message is displayed
    expect(screen.getByText(/You don't have any active students yet/i)).toBeInTheDocument();
    expect(screen.getByText('Add Your First Student')).toBeInTheDocument();
  });
  
  test('navigates to student detail when student item is clicked', async () => {
    renderDashboard();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('John Smith')).toBeInTheDocument();
    });
    
    // Click on student item
    fireEvent.click(screen.getByText('John Smith'));
    
    // Check if navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/students/1');
  });
});
