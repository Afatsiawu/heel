import { Outlet } from 'react-router-dom'
import { ShopProvider } from './ShopContext'
import './Shop.css'

function ShopShell() {
  return (
    <div className="shop-page">
      <div className="shop-route-outlet shop-route-outlet--with-hero">
        <div className="shop-hero">
          <div className="shop-hero__content">
            <p className="shop-hero__eyebrow">Luxury heels, curated</p>
            <h1 className="shop-hero__headline">Step into the Highlands Edit</h1>
            <p className="shop-hero__body">
              Discover premium styles built for long walks, bold days, and elevated nights.
            </p>
            <div className="shop-hero__actions">
              <a className="btn btn--primary" href="/shop/browse">
                Browse heels
              </a>
              <a className="btn btn--outline" href="/shop/login">
                Sign in
              </a>
            </div>
          </div>
        </div>

        <div className="shop-route-outlet__inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default function ShopLayout() {
  return (
    <ShopProvider>
      <ShopShell />
    </ShopProvider>
  )
}

