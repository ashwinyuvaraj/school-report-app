import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, BookOpen } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import { useSubjects } from '../contexts/SubjectsContext';
import { useToast } from '../contexts/ToastContext';

const EMOJI_PRESETS = [
  '📚', '✏️', '🔢', '🔤', '📝', '🌿', '⚽', '💻', '🗣️', '🎨',
  '🔬', '🌍', '🇮🇳', '🎵', '🏃', '💡', '🧪', '📐', '🗺️', '🎭',
];

export default function SubjectsPage() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useSubjects();
  const { addToast } = useToast();

  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('📚');
  const [showAddForm, setShowAddForm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');

  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    if (!newName.trim()) { addToast('Please enter a subject name.', 'error'); return; }
    if (!newEmoji.trim()) { addToast('Please select an emoji.', 'error'); return; }
    addSubject(newName.trim(), newEmoji.trim());
    setNewName('');
    setNewEmoji('📚');
    setShowAddForm(false);
    addToast('Subject added successfully!');
  };

  const startEdit = (subject) => {
    setEditId(subject.id);
    setEditName(subject.name);
    setEditEmoji(subject.emoji);
  };

  const handleEdit = () => {
    if (!editName.trim()) { addToast('Subject name cannot be empty.', 'error'); return; }
    updateSubject(editId, editName.trim(), editEmoji.trim());
    setEditId(null);
    addToast('Subject updated!');
  };

  const handleDelete = () => {
    deleteSubject(deleteId);
    setDeleteId(null);
    addToast('Subject deleted.', 'info');
  };

  return (
    <AppLayout title="📚 Subjects">
      <div className="page-container">
        <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="page-title">Subjects</div>
            <div className="page-subtitle">{subjects.length} subjects configured</div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(s => !s)}
            style={{ marginTop: 4 }}
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="card mb-4" style={{ animation: 'slideUp 0.25s ease' }}>
            <div className="card-header">
              <div className="card-title"><span>➕</span> New Subject</div>
              <button className="btn btn-ghost btn-sm btn-icon" onClick={() => setShowAddForm(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="card-body">
              <div className="form-stack">
                <div className="form-group">
                  <label className="form-label">Subject Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Mathematics"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Emoji</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 🔢"
                    value={newEmoji}
                    onChange={e => setNewEmoji(e.target.value)}
                    style={{ fontSize: 20, width: 80 }}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ marginBottom: 8 }}>Quick Pick</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {EMOJI_PRESETS.map(e => (
                      <button
                        key={e}
                        onClick={() => setNewEmoji(e)}
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: 22,
                          border: `2px solid ${newEmoji === e ? 'var(--primary)' : 'var(--border)'}`,
                          borderRadius: 8,
                          background: newEmoji === e ? 'var(--primary-ultra-light)' : 'var(--surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary" onClick={handleAdd}>
                  <Check size={16} /> Save Subject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subjects List */}
        {subjects.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <div className="empty-state-title">No subjects yet</div>
              <div className="empty-state-message">
                Add your first subject to get started with report generation.
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(true)}>
                <Plus size={16} /> Add Subject
              </button>
            </div>
          </div>
        ) : (
          <div className="form-stack">
            {subjects.map(subject => (
              <div key={subject.id}>
                {editId === subject.id ? (
                  /* Edit form inline */
                  <div className="card" style={{ border: '1.5px solid var(--primary-light)' }}>
                    <div className="card-body">
                      <div className="form-stack">
                        <div className="form-grid-2">
                          <div className="form-group">
                            <label className="form-label">Emoji</label>
                            <input
                              type="text"
                              className="form-input"
                              value={editEmoji}
                              onChange={e => setEditEmoji(e.target.value)}
                              style={{ fontSize: 20 }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-input"
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              autoFocus
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleEdit}>
                            <Check size={15} /> Save
                          </button>
                          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditId(null)}>
                            <X size={15} /> Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="subject-chip">
                    <div className="subject-emoji">{subject.emoji}</div>
                    <div className="subject-name">{subject.name}</div>
                    <div className="subject-actions">
                      <button
                        className="btn btn-ghost btn-sm btn-icon"
                        onClick={() => startEdit(subject)}
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm btn-icon"
                        onClick={() => setDeleteId(subject.id)}
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Subject?"
        message="This subject will be removed from all dropdowns. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </AppLayout>
  );
}
