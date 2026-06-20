import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function AppLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} title={title} />
        <div className="page-enter">
          {children}
        </div>
      </div>
    </div>
  );
}
