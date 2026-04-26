import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '96px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;