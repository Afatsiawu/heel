import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="nav-bar">
        <NavLink end to="/" className="nav-bar__brand">
          heel
        </NavLink>

        <button
          type="button"
          className={`nav-bar__toggle ${menuOpen ? 'nav-bar__toggle--open' : ''}`}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-bar__toggle-line" />
          <span className="nav-bar__toggle-line" />
          <span className="nav-bar__toggle-line" />
        </button>

        <div className={`nav-bar__menu ${menuOpen ? 'nav-bar__menu--open' : ''}`}>
          <div className="nav-bar__section nav-bar__section--links">
            <NavLink
              end
              to="/"
              className={({ isActive }) => (isActive ? 'nav-bar__link active' : 'nav-bar__link')}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? 'nav-bar__link active' : 'nav-bar__link')}
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </NavLink>
          </div>

          <div className="nav-bar__section nav-bar__section--actions">
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? 'nav-bar__admin active' : 'nav-bar__admin')}
              onClick={() => setMenuOpen(false)}
            >
              Admin panel
            </NavLink>
          </div>
        </div>
      </nav>
      <div className={`nav-bar__overlay ${menuOpen ? 'nav-bar__overlay--open' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  )
}

export default NavBar
