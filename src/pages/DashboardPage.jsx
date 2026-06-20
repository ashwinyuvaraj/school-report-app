import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, Sun } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import { useSubjects } from '../contexts/SubjectsContext';
import { useReport } from '../contexts/ReportContext';
import { useToast } from '../contexts/ToastContext';
import storage from '../services/storage';
import {
  CLASSES,
  SECTIONS,
  getTodayFormatted,
  getDayFromDate,
  generateId,
} from '../utils/dateUtils';
import { generateReport } from '../utils/reportGenerator';

function createEmptyRow() {
  return { id: generateId(), subjectId: '', description: '' };
}

export default function DashboardPage() {
  const { subjects } = useSubjects();
  const { setCurrentReport } = useReport();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [date, setDate] = useState(getTodayFormatted());
  const [classSection, setClassSection] = useState('IV');
  const [section, setSection] = useState('B');
  const [day, setDay] = useState('');
  const [workRows, setWorkRows] = useState([createEmptyRow()]);
  const [hwRows, setHwRows] = useState([createEmptyRow()]);

  // Restore draft on mount
  useEffect(() => {
    const draft = storage.getDraft();
    if (draft) {
      if (draft.date) setDate(draft.date);
      if (draft.classSection) setClassSection(draft.classSection);
      if (draft.section) setSection(draft.section);
      if (draft.workRows?.length) setWorkRows(draft.workRows);
      if (draft.hwRows?.length) setHwRows(draft.hwRows);
    }
  }, []);

  // Auto-calculate day from date
  useEffect(() => {
    setDay(getDayFromDate(date));
  }, [date]);

  // Auto-save draft
  const saveDraft = useCallback(() => {
    storage.saveDraft({ date, classSection, section, workRows, hwRows });
  }, [date, classSection, section, workRows, hwRows]);

  useEffect(() => {
    const timer = setTimeout(saveDraft, 800);
    return () => clearTimeout(timer);
  }, [saveDraft]);

  // Date handling: convert to ISO for input type=date
  const handleDateChange = (e) => {
    const iso = e.target.value; // YYYY-MM-DD
    if (!iso) return;
    const [yyyy, mm, dd] = iso.split('-');
    setDate(`${dd}/${mm}/${yyyy}`);
  };

  const dateISO = (() => {
    if (!date || date.length !== 10) return '';
    const [dd, mm, yyyy] = date.split('/');
    return `${yyyy}-${mm}-${dd}`;
  })();

  // Work rows
  const addWorkRow = () => setWorkRows(r => [...r, createEmptyRow()]);
  const updateWorkRow = (id, field, value) =>
    setWorkRows(r => r.map(row => row.id === id ? { ...row, [field]: value } : row));
  const deleteWorkRow = (id) => {
    if (workRows.length === 1) { addToast('At least one work entry is required.', 'error'); return; }
    setWorkRows(r => r.filter(row => row.id !== id));
  };

  // Homework rows
  const addHwRow = () => setHwRows(r => [...r, createEmptyRow()]);
  const updateHwRow = (id, field, value) =>
    setHwRows(r => r.map(row => row.id === id ? { ...row, [field]: value } : row));
  const deleteHwRow = (id) => {
    if (hwRows.length === 1) { addToast('At least one homework entry is required.', 'error'); return; }
    setHwRows(r => r.filter(row => row.id !== id));
  };

  const getSubjectById = (id) => subjects.find(s => s.id === id);

  const handleGenerate = () => {
    // Validate
    const validWork = workRows.filter(r => r.subjectId && r.description.trim());
    const validHw = hwRows.filter(r => r.subjectId && r.description.trim());

    if (!date) { addToast('Please select a date.', 'error'); return; }
    if (!day) { addToast('Invalid date selected.', 'error'); return; }
    if (validWork.length === 0) { addToast('Please add at least one work done entry.', 'error'); return; }
    if (validHw.length === 0) { addToast('Please add at least one homework entry.', 'error'); return; }

    const workDone = validWork.map(r => ({
      subject: getSubjectById(r.subjectId),
      description: r.description.trim(),
    }));
    const homework = validHw.map(r => ({
      subject: getSubjectById(r.subjectId),
      description: r.description.trim(),
    }));

    const message = generateReport({ date, classSection, section, day, workDone, homework });

    const report = {
      id: generateId(),
      date,
      classSection,
      section,
      day,
      message,
      generatedAt: new Date().toISOString(),
    };

    storage.addToHistory(report);
    setCurrentReport(report);
    storage.clearDraft();
    navigate('/output');
  };

  return (
    <AppLayout title="📝 Create Report">
      <div className="page-container">
        <div className="page-header">
          <div className="page-title">Daily Report</div>
          <div className="page-subtitle">Fill in the details to generate today's report</div>
        </div>

        {/* School Banner */}
        <div className="school-banner">
          <div className="school-banner-icon">🏫</div>
          <div>
            <div className="school-banner-text">ALLWIN MATRIC HR. SEC. SCHOOL</div>
            <div className="school-banner-sub">Fixed school name — cannot be edited</div>
          </div>
        </div>

        {/* Date & Day */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="card-title">
              <span>📅</span> Date & Day
            </div>
            {day && (
              <div style={{
                background: 'var(--primary-ultra-light)',
                color: 'var(--primary)',
                padding: '4px 12px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
              }}>
                <Sun size={12} style={{ display: 'inline', marginRight: 4 }} />
                {day}
              </div>
            )}
          </div>
          <div className="card-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">📅 Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={dateISO}
                  onChange={handleDateChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">📆 Day</label>
                <input
                  type="text"
                  className="form-input"
                  value={day || '—'}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* Class & Section */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="card-title">
              <span>👩‍🏫</span> Class & Section
            </div>
          </div>
          <div className="card-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Class</label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={classSection}
                    onChange={e => setClassSection(e.target.value)}
                  >
                    {CLASSES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Section</label>
                <div className="form-select-wrapper">
                  <select
                    className="form-select"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                  >
                    {SECTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Work Done */}
        <div className="section-heading">
          <span className="section-heading-text">📝 WORK DONE IN THE CLASSROOM</span>
          <div className="section-heading-line" />
        </div>

        <div className="form-stack mb-4">
          {workRows.map((row, idx) => (
            <WorkRow
              key={row.id}
              row={row}
              index={idx}
              subjects={subjects}
              onSubjectChange={(id) => updateWorkRow(row.id, 'subjectId', id)}
              onDescriptionChange={(val) => updateWorkRow(row.id, 'description', val)}
              onDelete={() => deleteWorkRow(row.id)}
            />
          ))}
          <button className="add-item-btn" onClick={addWorkRow}>
            <Plus size={18} />
            Add Work
          </button>
        </div>

        {/* Homework */}
        <div className="section-heading">
          <span className="section-heading-text">🏠 TODAY'S HOMEWORK</span>
          <div className="section-heading-line" />
        </div>

        <div className="form-stack mb-4">
          {hwRows.map((row, idx) => (
            <WorkRow
              key={row.id}
              row={row}
              index={idx}
              subjects={subjects}
              onSubjectChange={(id) => updateHwRow(row.id, 'subjectId', id)}
              onDescriptionChange={(val) => updateHwRow(row.id, 'description', val)}
              onDelete={() => deleteHwRow(row.id)}
            />
          ))}
          <button className="add-item-btn" onClick={addHwRow}>
            <Plus size={18} />
            Add Homework
          </button>
        </div>

        {/* Fixed Notes */}
        <div className="section-heading">
          <span className="section-heading-text">📌 Fixed Notes</span>
          <div className="section-heading-line" />
        </div>
        <div className="note-preview" style={{ marginBottom: 8 }}>
          📌 NOTE: Kindly ensure that all books are brought regularly and homework is completed neatly.
          <br /><br />
          🙏 Parents are requested to check the diary regularly and help children prepare for tests.
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
          These notes are automatically added to every report.
        </p>

        {/* Generate Button */}
        <div className="generate-section">
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={handleGenerate}
          >
            <FileText size={20} />
            Generate Report
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

function WorkRow({ row, index, subjects, onSubjectChange, onDescriptionChange, onDelete }) {
  const selectedSubject = subjects.find(s => s.id === row.subjectId);

  return (
    <div className="work-row">
      <div className="work-row-header">
        <div className="work-row-number">{index + 1}</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', flex: 1 }}>
          {selectedSubject ? `${selectedSubject.emoji} ${selectedSubject.name}` : 'Select a subject'}
        </span>
        <button className="work-row-delete" onClick={onDelete} title="Remove">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="form-group">
        <div className="form-select-wrapper">
          <select
            className="form-select"
            value={row.subjectId}
            onChange={e => onSubjectChange(e.target.value)}
          >
            <option value="">— Select Subject —</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Describe what was done..."
          value={row.description}
          onChange={e => onDescriptionChange(e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
}
