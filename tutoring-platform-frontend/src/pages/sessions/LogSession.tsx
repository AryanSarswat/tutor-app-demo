import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import './LogSession.css';

// Mock topics based on subject
const subjectTopics: Record<string, string[]> = {
  'Math': ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'],
  'Physics': ['Mechanics', 'Electricity', 'Magnetism', 'Optics', 'Thermodynamics'],
  'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
  'Biology': ['Cell Biology', 'Genetics', 'Ecology', 'Anatomy', 'Physiology'],
  'English': ['Grammar', 'Literature', 'Essay Writing', 'Comprehension', 'Vocabulary'],
  'History': ['Ancient History', 'Medieval History', 'Modern History', 'World Wars', 'Political History'],
  'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Web Development', 'Databases']
};

const LogSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  
  // Form state
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [engagement, setEngagement] = useState(5);
  const [comprehension, setComprehension] = useState(5);
  const [execution, setExecution] = useState(5);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [informalNotes, setInformalNotes] = useState('');
  const [otherComments, setOtherComments] = useState('');
  
  // Available topics based on selected subject
  const availableTopics = subject ? subjectTopics[subject] || [] : [];

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleGenerateSummary = async () => {
    if (!subject || !informalNotes) {
      setError('Please enter a subject and informal notes before generating a summary');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Mock API call to generate AI summary
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock summary based on the informal notes
      const mockSummary = `
        During today's ${subject} session, the student demonstrated a level ${engagement}/10 engagement.
        
        The student's comprehension of the material was rated at ${comprehension}/10, and their ability to execute the concepts was ${execution}/10.
        
        We covered the following topics: ${selectedTopics.join(', ')}.
        
        ${informalNotes.length > 100 
          ? informalNotes.substring(0, 100) + '... The student showed good progress overall.'
          : informalNotes + ' The student showed good progress overall.'
        }
        
        ${otherComments ? `Additional notes: ${otherComments}` : ''}
      `.trim();
      
      setAiSummary(mockSummary);
      setShowSummary(true);
    } catch (err) {
      setError('Failed to generate summary');
      console.error('Error generating summary:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSession = async () => {
    if (!aiSummary) {
      setError('Please generate a summary before saving the session');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call to save session
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to student detail page
      navigate(`/students/${id}`);
    } catch (err) {
      setError('Failed to save session');
      console.error('Error saving session:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="log-session-container">
      <div className="back-button-container">
        <BackButton to={`/students/${id}`} label="Back to Student" />
      </div>
      
      <div className="log-session-header">
        <h1>Log New Session</h1>
      </div>

      {error && <div className="log-session-error">{error}</div>}

      {showSummary ? (
        <div className="summary-container">
          <h2>AI-Generated Summary</h2>
          <div className="summary-content">
            <textarea
              value={aiSummary || ''}
              onChange={(e) => setAiSummary(e.target.value)}
              rows={10}
              className="summary-textarea"
            />
          </div>
          <div className="summary-actions">
            <button 
              className="edit-summary-button"
              onClick={() => setShowSummary(false)}
            >
              Back to Session Form
            </button>
            <button 
              className="save-session-button"
              onClick={handleSaveSession}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Session & Generate PDF'}
            </button>
          </div>
        </div>
      ) : (
        <div className="session-form">
          <div className="form-section">
            <h2>Session Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSelectedTopics([]);
                  }}
                  required
                >
                  <option value="">Select a subject</option>
                  {Object.keys(subjectTopics).map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date & Time</label>
                <input
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Performance Ratings</h2>
            <div className="slider-group">
              <label htmlFor="engagement">Engagement: {engagement}/10</label>
              <input
                id="engagement"
                type="range"
                min="1"
                max="10"
                value={engagement}
                onChange={(e) => setEngagement(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            <div className="slider-group">
              <label htmlFor="comprehension">Comprehension: {comprehension}/10</label>
              <input
                id="comprehension"
                type="range"
                min="1"
                max="10"
                value={comprehension}
                onChange={(e) => setComprehension(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            <div className="slider-group">
              <label htmlFor="execution">Execution: {execution}/10</label>
              <input
                id="execution"
                type="range"
                min="1"
                max="10"
                value={execution}
                onChange={(e) => setExecution(parseInt(e.target.value))}
                className="slider"
              />
            </div>
          </div>

          {subject && (
            <div className="form-section">
              <h2>Key Topics Covered</h2>
              <div className="topics-container">
                {availableTopics.length > 0 ? (
                  <div className="topics-grid">
                    {availableTopics.map(topic => (
                      <div 
                        key={topic} 
                        className={`topic-item ${selectedTopics.includes(topic) ? 'selected' : ''}`}
                        onClick={() => handleTopicToggle(topic)}
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-topics-message">No topics available for the selected subject.</p>
                )}
              </div>
            </div>
          )}

          <div className="form-section">
            <h2>Session Notes</h2>
            <div className="form-group">
              <label htmlFor="informalNotes">Informal Notes (for AI Summary)</label>
              <textarea
                id="informalNotes"
                value={informalNotes}
                onChange={(e) => setInformalNotes(e.target.value)}
                rows={6}
                placeholder="Enter your detailed observations, thoughts, and notes about the session. This will be used to generate the AI summary."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="otherComments">Other Comments (will appear verbatim in report)</label>
              <textarea
                id="otherComments"
                value={otherComments}
                onChange={(e) => setOtherComments(e.target.value)}
                rows={3}
                placeholder="Add any specific remarks or instructions you want to appear exactly as written in the report."
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate(`/students/${id}`)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="generate-button"
              onClick={handleGenerateSummary}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Generating...' : 'Generate Summary & PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogSession;
