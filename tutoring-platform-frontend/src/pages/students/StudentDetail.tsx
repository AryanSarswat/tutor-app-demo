import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStudentById } from '../../services/student/studentService';
import { Student } from '../../types/student';
import BackButton from '../../components/common/BackButton';
import './StudentDetail.css';

// Mock session data - in a real app, this would come from an API
const mockSessions = [
  {
    id: '1',
    date: '2025-05-15T14:00:00',
    subject: 'Math',
    topics: ['Algebra', 'Equations'],
    engagement: 8,
    comprehension: 7,
    execution: 6
  },
  {
    id: '2',
    date: '2025-05-10T15:30:00',
    subject: 'Math',
    topics: ['Geometry', 'Triangles'],
    engagement: 9,
    comprehension: 8,
    execution: 7
  },
  {
    id: '3',
    date: '2025-05-05T14:00:00',
    subject: 'Physics',
    topics: ['Mechanics', 'Forces'],
    engagement: 7,
    comprehension: 6,
    execution: 8
  }
];

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const studentData = await getStudentById(id as string);
        setStudent(studentData);
      } catch (err) {
        setError('Failed to load student data');
        console.error('Error fetching student:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };

  if (isLoading) {
    return <div className="student-detail-loading">Loading student data...</div>;
  }

  if (error || !student) {
    return (
      <div className="student-detail-container">
        <div className="student-detail-error">
          {error || 'Student not found'}
          <div className="error-actions">
            <Link to="/students" className="back-to-list-button">
              Back to Students
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-detail-container">
      <div className="back-button-container">
        <BackButton to="/students" label="Back to Students" />
      </div>
      
      <div className="student-detail-header">
        <div className="header-title">
          <h1>{student.name}</h1>
          <div className="student-meta">
            <span className="student-age-grade">{student.age} years old • {student.grade}</span>
            <span className="student-subjects">{student.subjects.join(', ')}</span>
          </div>
        </div>
        <div className="header-actions">
          <Link to={`/students/edit/${id}`} className="edit-student-button">
            Edit Student
          </Link>
        </div>
      </div>

      {student.notes && (
        <div className="student-notes-section">
          <h2>Notes</h2>
          <p className="student-notes">{student.notes}</p>
        </div>
      )}

      <div className="student-sessions-section">
        <div className="section-header">
          <h2>Session History</h2>
          <div className="section-actions">
            <Link to={`/students/${id}/log-session`} className="log-session-button">
              Log New Session
            </Link>
            <button onClick={handleExportPDF} className="export-pdf-button">
              Export PDF
            </button>
          </div>
        </div>

        {mockSessions.length === 0 ? (
          <div className="no-sessions-message">
            No sessions recorded yet. Click "Log New Session" to add one.
          </div>
        ) : (
          <div className="sessions-list">
            {mockSessions.map(session => (
              <div key={session.id} className="session-card">
                <div className="session-header">
                  <div className="session-date">{formatDate(session.date)}</div>
                  <div className="session-subject">{session.subject}</div>
                </div>
                <div className="session-topics">
                  <span className="topics-label">Topics:</span> {session.topics.join(', ')}
                </div>
                <div className="session-ratings">
                  <div className="rating-item">
                    <span className="rating-label">Engagement:</span>
                    <div className="rating-bar">
                      <div 
                        className="rating-fill" 
                        style={{ width: `${(session.engagement / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="rating-value">{session.engagement}/10</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">Comprehension:</span>
                    <div className="rating-bar">
                      <div 
                        className="rating-fill" 
                        style={{ width: `${(session.comprehension / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="rating-value">{session.comprehension}/10</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">Execution:</span>
                    <div className="rating-bar">
                      <div 
                        className="rating-fill" 
                        style={{ width: `${(session.execution / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="rating-value">{session.execution}/10</span>
                  </div>
                </div>
                <div className="session-actions">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
