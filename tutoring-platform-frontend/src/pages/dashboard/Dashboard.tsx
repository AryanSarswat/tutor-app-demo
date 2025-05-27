import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../../services/student/studentService';
import { Student } from '../../types/student';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const students = await getStudents();
        // Get only active students and limit to 5 for the preview
        setRecentStudents(students.filter(s => !s.isArchived).slice(0, 5));
        
        // Mock recent sessions data
        setRecentSessions([
          {
            id: '1',
            studentName: 'John Smith',
            studentId: '1',
            date: '2025-05-18T14:00:00',
            subject: 'Math'
          },
          {
            id: '2',
            studentName: 'Emma Johnson',
            studentId: '2',
            date: '2025-05-17T15:30:00',
            subject: 'English'
          }
        ]);
      } catch (err) {
        setError('Failed to load students');
        console.error('Error fetching students:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tutor Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card welcome-card">
          <h2>Welcome, Test Tutor!</h2>
          <p>
            This is your tutoring platform dashboard. Here you can manage your students, 
            log tutoring sessions, and generate reports.
          </p>
        </div>

        <div className="dashboard-card students-preview-card">
          <div className="card-header">
            <h2>Your Students</h2>
            <Link to="/students/new" className="add-student-button">
              + Add New Student
            </Link>
          </div>

          {isLoading ? (
            <div className="loading-message">Loading students...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : recentStudents.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any active students yet.</p>
              <Link to="/students/new" className="add-first-student-button">
                Add Your First Student
              </Link>
            </div>
          ) : (
            <>
              <div className="students-preview-list">
                {recentStudents.map(student => (
                  <Link 
                    key={student.id} 
                    to={`/students/${student.id}`}
                    className="student-preview-item"
                  >
                    <div className="student-preview-name">{student.name}</div>
                    <div className="student-preview-details">
                      <span>{student.grade}</span>
                      <span className="separator">•</span>
                      <span>{student.subjects.join(', ')}</span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {recentStudents.length > 0 && (
                <div className="view-all-link">
                  <Link to="/students">View All Students</Link>
                </div>
              )}
            </>
          )}
        </div>

        <div className="dashboard-row">
          <div className="dashboard-card quick-actions-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/students/new" className="quick-action-button">
                Add New Student
              </Link>
              <Link to="/students" className="quick-action-button">
                View All Students
              </Link>
              <Link to="/profile" className="quick-action-button">
                Update Profile
              </Link>
            </div>
          </div>

          <div className="dashboard-card recent-activity-card">
            <h2>Recent Activity</h2>
            {recentSessions.length === 0 ? (
              <div className="empty-state">
                <p>No recent activity to display.</p>
              </div>
            ) : (
              <div className="recent-activity-list">
                {recentSessions.map(session => (
                  <Link 
                    key={session.id} 
                    to={`/students/${session.studentId}`}
                    className="activity-item"
                  >
                    <div className="activity-icon">
                      <span className="session-icon">📝</span>
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">
                        {session.subject} session with {session.studentName}
                      </div>
                      <div className="activity-time">
                        {formatDate(session.date)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
