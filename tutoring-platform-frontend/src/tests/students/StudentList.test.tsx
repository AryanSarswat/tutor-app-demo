import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudentList from '../../pages/students/StudentList';
import { getStudents, archiveStudent, unarchiveStudent } from '../../services/student/studentService';

// Mock the student service
jest.mock('../../services/student/studentService');

const mockGetStudents = getStudents as jest.MockedFunction<typeof getStudents>;
const mockArchiveStudent = archiveStudent as jest.MockedFunction<typeof archiveStudent>;
const mockUnarchiveStudent = unarchiveStudent as jest.MockedFunction<typeof unarchiveStudent>;

// Mock navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const renderStudentList = () => {
  return render(
    <BrowserRouter>
      <StudentList />
    </BrowserRouter>
  );
};

describe('StudentList Component', () => {
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
      },
      {
        id: '3',
        name: 'Sophia Davis',
        age: 14,
        grade: '9th',
        subjects: ['Math', 'Computer Science'],
        notes: 'Test notes',
        isArchived: true
      }
    ]);
    
    mockArchiveStudent.mockResolvedValue();
    mockUnarchiveStudent.mockResolvedValue();
  });
  
  test('renders student list correctly', async () => {
    renderStudentList();
    
    // Check loading state
    expect(screen.getByText(/loading students/i)).toBeInTheDocument();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument();
    });
    
    // Check if active students are displayed
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
    
    // Archived student should not be visible initially
    expect(screen.queryByText('Sophia Davis')).not.toBeInTheDocument();
  });
  
  test('toggles between active and archived students', async () => {
    renderStudentList();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument();
    });
    
    // Click to show archived students
    fireEvent.click(screen.getByText('Show Archived Students'));
    
    // Archived student should now be visible
    expect(screen.getByText('Sophia Davis')).toBeInTheDocument();
    
    // Active students should not be visible
    expect(screen.queryByText('John Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Emma Johnson')).not.toBeInTheDocument();
    
    // Click to show active students again
    fireEvent.click(screen.getByText('Show Active Students'));
    
    // Active students should be visible again
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
  });
  
  test('archives a student', async () => {
    renderStudentList();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument();
    });
    
    // Find and click archive button for John Smith
    const archiveButtons = screen.getAllByText('Archive');
    fireEvent.click(archiveButtons[0]);
    
    // Check if archiveStudent was called with correct ID
    expect(mockArchiveStudent).toHaveBeenCalledWith('1');
  });
  
  test('navigates to student detail when row is clicked', async () => {
    renderStudentList();
    
    // Wait for students to load
    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument();
    });
    
    // Find and click on John Smith row
    fireEvent.click(screen.getByText('John Smith'));
    
    // Check if navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/students/1');
  });
});
