import { createContext, useState } from 'react';

export const AuthContext = createContext();

const TOKEN_KEY = 'token';

const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
};

const parseTokenPayload = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    return null;
  }
};

const isTokenExpired = (payload) => {
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 < Date.now();
};

export function AuthProvider({ children }) {
  const checkToken = () => {
    const token = getStoredToken();
    if (!token) return { isLogin: false, role: null };

    const payload = parseTokenPayload(token);
    if (!payload || isTokenExpired(payload)) {
      clearStoredToken();
      return { isLogin: false, role: null };
    }

    return { isLogin: true, role: payload.role || null };
  };

  const [authState, setAuthState] = useState(checkToken);

  const login = (token) => {
    const payload = parseTokenPayload(token);
    if (!payload || isTokenExpired(payload)) {
      clearStoredToken();
      setAuthState({ isLogin: false, role: null });
      return;
    }

    setAuthState({ isLogin: true, role: payload.role || null });
  };

  const logout = () => {
    clearStoredToken();
    setAuthState({ isLogin: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}