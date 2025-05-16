import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Applications from './pages/Applications.jsx';
import AuthProvider, { useAuth } from './context/AuthContext.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import Navbar from './components/Navbar.jsx';
import Documents from './pages/Documents.jsx';
import { AnimatePresence } from "framer-motion";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}


export default function App() {
  return (
    <AuthProvider>

      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>

                <Dashboard />

              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute>

                <Applications />

              </PrivateRoute>
            }
          />
          <Route path="/documents/:appId" element={
            <PrivateRoute><Documents /></PrivateRoute>
          } />
        </Routes>
      </AnimatePresence>

    </AuthProvider>
  );
}
