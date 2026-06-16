import { Outlet } from 'react-router-dom'
import './MainLayout.css'
import NavBar from './NavBar'

function MainLayout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
