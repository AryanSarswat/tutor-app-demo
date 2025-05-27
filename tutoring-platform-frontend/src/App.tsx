import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/auth/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import LandingPage from './pages/landing/LandingPage';
// These will be implemented later
import Dashboard from './pages/dashboard/Dashboard';
import TutorProfile from './pages/profile/TutorProfile';
import StudentList from './pages/students/StudentList';
import StudentDetail from './pages/students/StudentDetail';
import AddEditStudent from './pages/students/AddEditStudent';
import LogSession from './pages/sessions/LogSession';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  
  return children;
};

// Catch-all route component that uses auth context
const CatchAllRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

// Separate component for routes that uses auth context safely
const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page - public */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth routes - public */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      
      {/* Legacy auth routes for backward compatibility */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />
      <Route path="/forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />
      <Route path="/reset-password" element={<Navigate to="/auth/reset-password" replace />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <TutorProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students" 
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students/new" 
        element={
          <ProtectedRoute>
            <AddEditStudent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students/edit/:id" 
        element={
          <ProtectedRoute>
            <AddEditStudent />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students/:id" 
        element={
          <ProtectedRoute>
            <StudentDetail />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students/:id/log-session" 
        element={
          <ProtectedRoute>
            <LogSession />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect to dashboard if authenticated, otherwise to landing page */}
      <Route path="*" element={<CatchAllRoute />} />
    </Routes>
  );
};

export default App;