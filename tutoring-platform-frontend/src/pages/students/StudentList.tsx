import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStudents, archiveStudent, unarchiveStudent } from '../../services/student/studentService';
import { Student } from '../../types/student';
import './StudentList.css';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const allStudents = await getStudents(true);
        
        // Separate active and archived students
        setStudents(allStudents.filter(student => !student.isArchived));
        setArchivedStudents(allStudents.filter(student => student.isArchived));
      } catch (err) {
        setError('Failed to load students');
        console.error('Error fetching students:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleArchiveStudent = async (id: string) => {
    try {
      setActionInProgress(id);
      await archiveStudent(id);
      
      // Update state after successful archive
      const studentToArchive = students.find(s => s.id === id);
      if (studentToArchive) {
        setStudents(students.filter(s => s.id !== id));
        setArchivedStudents([...archivedStudents, { ...studentToArchive, isArchived: true }]);
      }
    } catch (err) {
      setError('Failed to archive student');
      console.error('Error archiving student:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleUnarchiveStudent = async (id: string) => {
    try {
      setActionInProgress(id);
      await unarchiveStudent(id);
      
      // Update state after successful unarchive
      const studentToUnarchive = archivedStudents.find(s => s.id === id);
      if (studentToUnarchive) {
        setArchivedStudents(archivedStudents.filter(s => s.id !== id));
        setStudents([...students, { ...studentToUnarchive, isArchived: false }]);
      }
    } catch (err) {
      setError('Failed to unarchive student');
      console.error('Error unarchiving student:', err);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleRowClick = (id: string, isArchived: boolean) => {
    // Don't navigate if the archive/unarchive action is in progress
    if (actionInProgress === id) return;
    
    navigate(`/students/${id}`);
  };

  if (isLoading) {
    return <div className="students-loading">Loading students...</div>;
  }

  const displayedStudents = showArchived ? archivedStudents : students;

  return (
    <div className="students-container">
      <div className="students-header">
        <h1>Students</h1>
        <div className="header-actions">
          <button 
            className="toggle-archived-button"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? 'Show Active Students' : 'Show Archived Students'}
          </button>
          {!showArchived && (
            <Link to="/students/new" className="add-student-button">
              + Add New Student
            </Link>
          )}
        </div>
      </div>

      {error && <div className="students-error">{error}</div>}

      {displayedStudents.length === 0 ? (
        <div className="no-students-message">
          {showArchived 
            ? 'No archived students found.' 
            : 'No active students found. Add a new student to get started.'}
        </div>
      ) : (
        <div className="students-list">
          <div className="students-list-header">
            <div className="student-name-col">Name</div>
            <div className="student-grade-col">Grade</div>
            <div className="student-subjects-col">Subjects</div>
            <div className="student-actions-col">Actions</div>
          </div>
          
          {displayedStudents.map(student => (
            <div 
              key={student.id} 
              className="student-row"
              onClick={() => handleRowClick(student.id, student.isArchived)}
            >
              <div className="student-name-col">{student.name}</div>
              <div className="student-grade-col">{student.grade}</div>
              <div className="student-subjects-col">{student.subjects.join(', ')}</div>
              <div 
                className="student-actions-col"
                onClick={(e) => e.stopPropagation()} // Prevent row click when clicking actions
              >
                {showArchived ? (
                  <button 
                    className="unarchive-button"
                    onClick={() => handleUnarchiveStudent(student.id)}
                    disabled={actionInProgress === student.id}
                  >
                    {actionInProgress === student.id ? 'Unarchiving...' : 'Unarchive'}
                  </button>
                ) : (
                  <>
                    <Link 
                      to={`/students/edit/${student.id}`} 
                      className="edit-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </Link>
                    <button 
                      className="archive-button"
                      onClick={() => handleArchiveStudent(student.id)}
                      disabled={actionInProgress === student.id}
                    >
                      {actionInProgress === student.id ? 'Archiving...' : 'Archive'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
