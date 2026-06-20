import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, ArrowLeft, Share2 } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useReport } from '../contexts/ReportContext';
import { useToast } from '../contexts/ToastContext';

export default function OutputPage() {
  const { currentReport } = useReport();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentReport) {
      navigate('/dashboard');
    }
  }, [currentReport, navigate]);

  if (!currentReport) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentReport.message);
      addToast('Copied Successfully ✓', 'success');
    } catch {
      // Fallback for older browsers/Android
      const textarea = document.createElement('textarea');
      textarea.value = currentReport.message;
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Report – ${currentReport.date}`,
          text: currentReport.message,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AppLayout title="📄 Report">
      <div className="page-container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <button
              className="btn btn-secondary btn-sm btn-icon"
              onClick={() => navigate('/dashboard')}
              title="Back"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="page-title" style={{ fontSize: 20 }}>Generated Report</div>
          </div>
          <div className="page-subtitle">
            📅 {currentReport.date} &nbsp;|&nbsp; 👩‍🏫 Class {currentReport.classSection}-{currentReport.section} &nbsp;|&nbsp; 📆 {currentReport.day}
          </div>
        </div>

        {/* Report Card */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="card-title">
              <span>📋</span> WhatsApp Message
            </div>
            <span style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              background: 'var(--surface-2)',
              padding: '3px 10px',
              borderRadius: 999,
            }}>
              Ready to copy
            </span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="report-output" style={{ borderRadius: 0, border: 'none', margin: 0 }}>
              {currentReport.message}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={handleCopy}>
            <Copy size={20} />
            Copy Message
          </button>

          {navigator.share && (
            <button className="btn btn-secondary btn-full btn-lg" onClick={handleShare}>
              <Share2 size={20} />
              Share via WhatsApp
            </button>
          )}

          <button
            className="btn btn-ghost btn-full"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>

        <div style={{
          marginTop: 20,
          padding: '12px 16px',
          background: 'var(--success-light)',
          border: '1px solid #A7F3D0',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          color: 'var(--success)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          ✅ Report has been saved to History automatically.
        </div>
      </div>
    </AppLayout>
  );
}
