import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter your User ID and Password.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = login(username.trim(), password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-school-icon">🏫</span>
          <div className="login-school-name">ALLWIN MATRIC HR. SEC. SCHOOL</div>
          <div className="login-school-tag">Daily Report Generator</div>
        </div>

        <div className="login-title">Welcome Back 👋</div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">👤 User ID</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your User ID"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              autoComplete="username"
              autoCapitalize="none"
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  padding: 4,
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 16,
                  height: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                  display: 'inline-block',
                }} />
                Signing in...
              </span>
            ) : '🔑 Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--text-muted)',
          marginTop: 20,
        }}>
          Secure access for authorized teachers only.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
