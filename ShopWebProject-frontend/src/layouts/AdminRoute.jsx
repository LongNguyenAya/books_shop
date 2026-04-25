import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { isLogin, role } = useContext(AuthContext);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;