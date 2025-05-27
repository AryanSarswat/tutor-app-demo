import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import './StudentDetail.css';

// Update the StudentDetail component to include the BackButton
const StudentDetail = () => {
  // ... existing code

  return (
    <div className="student-detail-container">
      <div className="back-button-container">
        <BackButton to="/students" label="Back to Students" />
      </div>
      
      {/* Rest of the component */}
      <div className="student-detail-header">
        {/* ... */}
      </div>
      
      {/* ... */}
    </div>
  );
};

export default StudentDetail;
