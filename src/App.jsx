import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { SubjectsProvider } from './contexts/SubjectsContext';
import { ReportProvider } from './contexts/ReportContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import OutputPage from './pages/OutputPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubjectsProvider>
          <ReportProvider>
            <ToastProvider>
              <HashRouter>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/subjects"
                    element={
                      <ProtectedRoute>
                        <SubjectsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/output"
                    element={
                      <ProtectedRoute>
                        <OutputPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <ProtectedRoute>
                        <HistoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </HashRouter>
            </ToastProvider>
          </ReportProvider>
        </SubjectsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
