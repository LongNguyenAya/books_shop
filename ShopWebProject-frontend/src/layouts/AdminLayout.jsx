import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="admin-fullscreen">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
