import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext';
import './Layout.css';

const Layout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-logo">
          <h1>Tutor Platform</h1>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/students" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <div className="nav-user">
          <div className="user-info">
            <span className="user-name">Test Tutor</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      
      {/* Breadcrumb navigation */}
      {location.pathname !== '/dashboard' && (
        <div className="breadcrumb-container">
          <div className="breadcrumb">
            <NavLink to="/dashboard">Home</NavLink>
            {location.pathname.includes('/students') && (
              <>
                <span className="breadcrumb-separator">/</span>
                {location.pathname === '/students' ? (
                  <span>Students</span>
                ) : (
                  <NavLink to="/students">Students</NavLink>
                )}
              </>
            )}
            {location.pathname.includes('/students/new') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span>Add New Student</span>
              </>
            )}
            {location.pathname.includes('/students/edit/') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span>Edit Student</span>
              </>
            )}
            {location.pathname.match(/\/students\/[^/]+$/) && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span>Student Details</span>
              </>
            )}
            {location.pathname.includes('/log-session') && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span>Log Session</span>
              </>
            )}
            {location.pathname === '/profile' && (
              <>
                <span className="breadcrumb-separator">/</span>
                <span>Profile</span>
              </>
            )}
          </div>
        </div>
      )}
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
