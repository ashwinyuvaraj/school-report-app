import { createContext, useContext, useState } from 'react';

const ReportContext = createContext(null);

export function ReportProvider({ children }) {
  const [currentReport, setCurrentReport] = useState(null);

  return (
    <ReportContext.Provider value={{ currentReport, setCurrentReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReport must be used within ReportProvider');
  return ctx;
}
