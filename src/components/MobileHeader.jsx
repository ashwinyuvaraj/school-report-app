import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function MobileHeader({ onMenuClick, title }) {
  const { isDark, toggleDark } = useTheme();

  return (
    <header className="mobile-header">
      <button className="hamburger-btn" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <span className="mobile-header-title">
        {title || '🏫 Allwin Reporter'}
      </span>
      <div className="mobile-header-actions">
        <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
