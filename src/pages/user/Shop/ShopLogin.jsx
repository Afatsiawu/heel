import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from './ShopContext'

export default function ShopLogin() {
  const {
    user,
    loggedIn,
    loginError,
    handleUserChange,
    handleLogin,
  } = useShop()
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      navigate('../browse', { replace: true })
    }
  }, [loggedIn, navigate])

  return (
    <section className="shop-section shop-section--login">
      <div className="shop-panel" style={{ maxWidth: '460px', margin: '4rem auto 0' }}>
        <h2 className="shop-panel__title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign In</h2>
        <form onSubmit={handleLogin} className="shop-form">
          <label className="shop-label" htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleUserChange}
              className="shop-input"
              placeholder="hello@heels.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="shop-label" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleUserChange}
              className="shop-input"
              placeholder="Minimum 5 characters"
              required
              autoComplete="current-password"
            />
          </label>
          
          {loginError && <p className="shop-error" role="alert">{loginError}</p>}
          
          <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign in
          </button>
        </form>
      </div>
    </section>
  )
}