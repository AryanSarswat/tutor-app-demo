import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials, ForgotPasswordData, ResetPasswordData, User } from '../../types/auth';
import { loginUser, registerUser, forgotPassword, resetPassword, getCurrentUser } from '../../services/auth/authService';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'FORGOT_PASSWORD_REQUEST' }
  | { type: 'FORGOT_PASSWORD_SUCCESS' }
  | { type: 'FORGOT_PASSWORD_FAILURE'; payload: string }
  | { type: 'RESET_PASSWORD_REQUEST' }
  | { type: 'RESET_PASSWORD_SUCCESS' }
  | { type: 'RESET_PASSWORD_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'AUTH_LOADED'; payload: User | null };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
    case 'FORGOT_PASSWORD_REQUEST':
    case 'RESET_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null
      };
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'FORGOT_PASSWORD_FAILURE':
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'AUTH_LOADED':
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

// Create context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  forgotPasswordRequest: (data: ForgotPasswordData) => Promise<void>;
  resetPasswordRequest: (data: ResetPasswordData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        dispatch({ type: 'AUTH_LOADED', payload: user });
      } catch (error) {
        dispatch({ type: 'AUTH_LOADED', payload: null });
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const user = await loginUser(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  };

  // Register
  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const user = await registerUser(credentials);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
      throw error;
    }
  };

  // Forgot Password
  const forgotPasswordRequest = async (data: ForgotPasswordData) => {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
    try {
      await forgotPassword(data);
      dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
    } catch (error) {
      dispatch({ 
        type: 'FORGOT_PASSWORD_FAILURE', 
        payload: error instanceof Error ? error.message : 'Password reset request failed' 
      });
      throw error;
    }
  };

  // Reset Password
  const resetPasswordRequest = async (data: ResetPasswordData) => {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' });
    try {
      await resetPassword(data);
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
    } catch (error) {
      dispatch({ 
        type: 'RESET_PASSWORD_FAILURE', 
        payload: error instanceof Error ? error.message : 'Password reset failed' 
      });
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        forgotPasswordRequest,
        resetPasswordRequest,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
