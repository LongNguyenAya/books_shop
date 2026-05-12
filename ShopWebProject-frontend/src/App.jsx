import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import CartPage from './pages/CartPage';
import MarketplacePage from './pages/product/MarketplacePage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import DashboardPage from './pages/admin/DashboardPage';

import AdminRoute from './layouts/AdminRoute';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/marketplace' element={<MarketplacePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/product/:slug' element={<ProductDetailPage />} />
      </Route>

      <Route path='/admin' element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path='dashboard' element={<DashboardPage />} />
      </Route>

      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />

    </Routes>
  );
}

export default App;