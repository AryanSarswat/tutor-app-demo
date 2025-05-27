import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogSession from '../../pages/sessions/LogSession';

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn()
}));

const renderLogSession = () => {
  return render(
    <BrowserRouter>
      <LogSession />
    </BrowserRouter>
  );
};

describe('LogSession Component', () => {
  test('renders session form correctly', () => {
    renderLogSession();
    
    // Check if form elements are rendered
    expect(screen.getByText('Log New Session')).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date & Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Engagement:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comprehension:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Execution:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Informal Notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Other Comments/i)).toBeInTheDocument();
    expect(screen.getByText('Generate Summary & PDF')).toBeInTheDocument();
  });
  
  test('shows error when trying to generate summary without required fields', async () => {
    renderLogSession();
    
    // Try to generate summary without filling required fields
    fireEvent.click(screen.getByText('Generate Summary & PDF'));
    
    // Check if error message is displayed
    expect(screen.getByText(/Please enter a subject and informal notes/i)).toBeInTheDocument();
  });
  
  test('generates summary when form is filled correctly', async () => {
    renderLogSession();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Math' } });
    fireEvent.change(screen.getByLabelText(/Informal Notes/i), { 
      target: { value: 'The student showed good understanding of algebra concepts.' } 
    });
    
    // Generate summary
    fireEvent.click(screen.getByText('Generate Summary & PDF'));
    
    // Wait for summary to be generated
    await waitFor(() => {
      expect(screen.getByText('AI-Generated Summary')).toBeInTheDocument();
    });
    
    // Check if summary textarea is displayed
    const summaryTextarea = screen.getByRole('textbox');
    expect(summaryTextarea).toBeInTheDocument();
    
    // Check if save button is displayed
    expect(screen.getByText('Save Session & Generate PDF')).toBeInTheDocument();
  });
  
  test('allows editing the generated summary', async () => {
    renderLogSession();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Math' } });
    fireEvent.change(screen.getByLabelText(/Informal Notes/i), { 
      target: { value: 'The student showed good understanding of algebra concepts.' } 
    });
    
    // Generate summary
    fireEvent.click(screen.getByText('Generate Summary & PDF'));
    
    // Wait for summary to be generated
    await waitFor(() => {
      expect(screen.getByText('AI-Generated Summary')).toBeInTheDocument();
    });
    
    // Edit the summary
    const summaryTextarea = screen.getByRole('textbox');
    fireEvent.change(summaryTextarea, { 
      target: { value: 'This is an edited summary.' } 
    });
    
    // Check if the edited value is reflected
    expect(summaryTextarea).toHaveValue('This is an edited summary.');
  });
});
