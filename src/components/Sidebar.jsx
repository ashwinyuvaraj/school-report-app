import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, History, LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/history', icon: History, label: 'History' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout, user } = useAuth();
  const { isDark, toggleDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">🏫</div>
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-name">ALLWIN MATRIC</span>
              <span className="sidebar-logo-sub">HR. SEC. SCHOOL</span>
            </div>
            <button
              onClick={onClose}
              style={{
                marginLeft: 'auto',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
                color: 'white',
                display: 'flex',
              }}
              className="md-hidden"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon className="nav-icon" size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {user?.username?.[0]?.toUpperCase() || 'T'}
            </div>
            <div>
              <div className="sidebar-username">{user?.username || 'Teacher'}</div>
              <div className="sidebar-role">Class Teacher</div>
            </div>
          </div>

          <button
            onClick={() => {
              toggleDark();
            }}
            className="sidebar-nav-item"
            style={{ marginBottom: 4 }}
          >
            <span style={{ fontSize: 18, width: 20, textAlign: 'center' }}>
              {isDark ? '☀️' : '🌙'}
            </span>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button onClick={handleLogout} className="sidebar-nav-item" style={{ color: '#FCA5A5' }}>
            <LogOut className="nav-icon" size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
