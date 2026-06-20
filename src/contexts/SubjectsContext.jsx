import { createContext, useContext, useState, useEffect } from 'react';
import storage from '../services/storage';
import { generateId } from '../utils/dateUtils';

const SubjectsContext = createContext(null);

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(storage.getSubjects());
  }, []);

  const addSubject = (name, emoji) => {
    const newSubject = { id: generateId(), name: name.trim(), emoji: emoji.trim() };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    storage.saveSubjects(updated);
    return newSubject;
  };

  const updateSubject = (id, name, emoji) => {
    const updated = subjects.map(s =>
      s.id === id ? { ...s, name: name.trim(), emoji: emoji.trim() } : s
    );
    setSubjects(updated);
    storage.saveSubjects(updated);
  };

  const deleteSubject = (id) => {
    const updated = subjects.filter(s => s.id !== id);
    setSubjects(updated);
    storage.saveSubjects(updated);
  };

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject, updateSubject, deleteSubject }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export function useSubjects() {
  const ctx = useContext(SubjectsContext);
  if (!ctx) throw new Error('useSubjects must be used within SubjectsProvider');
  return ctx;
}
