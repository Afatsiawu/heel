import { Navigate, Route, Routes } from 'react-router-dom'
import ShopLayout from '../pages/user/Shop/ShopLayout'
import ShopLogin from '../pages/user/Shop/ShopLogin'
import ShopBrowse from '../pages/user/Shop/ShopBrowse'
import ShopCart from '../pages/user/Shop/ShopCart'
import ShopCheckout from '../pages/user/Shop/ShopCheckout'
import ShopProduct from '../pages/user/Shop/ShopProduct'

export default function ShopRoutes() {
  return (
    <Routes>
      <Route path="" element={<ShopLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<ShopLogin />} />
        <Route path="browse" element={<ShopBrowse />} />
        <Route path="product/:productId" element={<ShopProduct />} />
        <Route path="cart" element={<ShopCart />} />
        <Route path="checkout" element={<ShopCheckout />} />
      </Route>
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  )
}
