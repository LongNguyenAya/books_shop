import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const checkToken = () => {
    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { isLogin: true, role: payload.role };
      } catch (error) {
        return { isLogin: false, role: null };
      }
    }
    return { isLogin: false, role: null };
  };

  const [authState, setAuthState] = useState(checkToken);

  const login = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    setAuthState({ isLogin: true, role: payload.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setAuthState({ isLogin: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}