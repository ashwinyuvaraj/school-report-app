import { createContext, useContext, useState, useEffect } from 'react';
import storage from '../services/storage';

const AuthContext = createContext(null);

const CREDENTIALS = {
  username: 'Banumathi',
  password: '1234',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      const session = { username, loginTime: new Date().toISOString() };
      storage.saveSession(session);
      setUser(session);
      return { success: true };
    }
    return { success: false, error: 'Invalid User ID or Password.' };
  };

  const logout = () => {
    storage.clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
