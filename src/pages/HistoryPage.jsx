import { useState, useEffect, useCallback } from 'react';
import { Copy, Trash2, Eye, Search, X } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../contexts/ToastContext';
import { useReport } from '../contexts/ReportContext';
import storage from '../services/storage';
import { formatDateTime } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [viewReport, setViewReport] = useState(null);
  const { addToast } = useToast();
  const { setCurrentReport } = useReport();
  const navigate = useNavigate();

  const loadHistory = useCallback(() => {
    setHistory(storage.getHistory());
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredHistory = history.filter(r => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.date?.toLowerCase().includes(q) ||
      r.classSection?.toLowerCase().includes(q) ||
      r.section?.toLowerCase().includes(q) ||
      r.day?.toLowerCase().includes(q)
    );
  });

  const handleDelete = () => {
    storage.deleteFromHistory(deleteId);
    loadHistory();
    setDeleteId(null);
    addToast('Report deleted.', 'info');
    if (viewReport?.id === deleteId) setViewReport(null);
  };

  const handleCopy = async (message) => {
    try {
      await navigator.clipboard.writeText(message);
      addToast('Copied Successfully ✓', 'success');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        addToast('Copied Successfully ✓', 'success');
      } catch {
        addToast('Please copy manually.', 'error');
      }
      document.body.removeChild(textarea);
    }
  };

  const handleView = (report) => {
    setCurrentReport(report);
    navigate('/output');
  };

  return (
    <AppLayout title="📜 History">
      <div className="page-container">
        <div className="page-header">
          <div className="page-title">Report History</div>
          <div className="page-subtitle">
            {history.length} report{history.length !== 1 ? 's' : ''} saved
          </div>
        </div>

        {/* Search */}
        <div className="search-wrapper mb-4">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="form-input"
            placeholder="Search by date, class, or day..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
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
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">{search ? '🔍' : '📜'}</div>
              <div className="empty-state-title">
                {search ? 'No matching reports' : 'No reports yet'}
              </div>
              <div className="empty-state-message">
                {search
                  ? `No reports match "${search}". Try a different date or class.`
                  : 'Generated reports will appear here. Create your first report from the Dashboard.'
                }
              </div>
              {search && (
                <button className="btn btn-secondary btn-sm" onClick={() => setSearch('')}>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="form-stack">
            {filteredHistory.map(report => (
              <HistoryCard
                key={report.id}
                report={report}
                onView={() => handleView(report)}
                onCopy={() => handleCopy(report.message)}
                onDelete={() => setDeleteId(report.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Report?"
        message="This report will be permanently deleted from history."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </AppLayout>
  );
}

function HistoryCard({ report, onView, onCopy, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="history-card">
      <div className="history-card-header">
        <div>
          <div className="history-card-title">
            📅 {report.date} &nbsp;·&nbsp; 👩‍🏫 {report.classSection}-{report.section}
          </div>
          <div className="history-card-meta">
            📆 {report.day} &nbsp;|&nbsp; 🕐 {formatDateTime(report.generatedAt)}
          </div>
        </div>
        <div className="history-card-actions">
          <button
            className="btn btn-ghost btn-sm btn-icon"
            onClick={onCopy}
            title="Copy"
          >
            <Copy size={15} />
          </button>
          <button
            className="btn btn-ghost btn-sm btn-icon"
            onClick={onView}
            title="View"
          >
            <Eye size={15} />
          </button>
          <button
            className="btn btn-danger btn-sm btn-icon"
            onClick={onDelete}
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setExpanded(s => !s)}
        style={{ fontSize: 12, padding: '5px 8px', color: 'var(--text-muted)' }}
      >
        {expanded ? '▲ Hide preview' : '▼ Show preview'}
      </button>

      {expanded && (
        <div
          className="report-output"
          style={{
            marginTop: 10,
            fontSize: 13,
            padding: 14,
            maxHeight: 300,
            overflowY: 'auto',
            animation: 'slideUp 0.2s ease',
          }}
        >
          {report.message}
        </div>
      )}
    </div>
  );
}
