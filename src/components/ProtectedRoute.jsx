import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: 32,
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        color: 'white',
        flexDirection: 'column',
        gap: 16,
        fontFamily: 'var(--font-display)',
      }}>
        <span style={{ fontSize: 52, animation: 'bounceIn 0.6s ease' }}>🏫</span>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Loading...</span>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
