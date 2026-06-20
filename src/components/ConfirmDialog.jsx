import { Trash2 } from 'lucide-react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Delete', confirmClass = 'btn btn-danger btn-full' }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <div className="dialog-icon">
          <Trash2 size={24} color="#EF4444" />
        </div>
        <div className="dialog-title">{title || 'Are you sure?'}</div>
        <div className="dialog-message">{message || 'This action cannot be undone.'}</div>
        <div className="dialog-actions">
          <button className="btn btn-secondary btn-full" onClick={onCancel}>
            Cancel
          </button>
          <button className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
