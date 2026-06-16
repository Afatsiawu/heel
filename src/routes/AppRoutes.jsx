import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/user/Home/Home'
import ShopRoutes from './ShopRoutes'
import Dashboard from '../pages/admin/Dashboard/Dashboard'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<ShopRoutes />} />
        <Route path="admin" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes