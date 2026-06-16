import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductList.css'

const ALL_PRODUCTS = [
  { id: 1,  name: 'Summit Ridge Tote',      price: 148, tag: 'Bestseller', material: 'Full-grain leather', category: 'Totes',      color: 'Tan' },
  { id: 2,  name: 'Moorland Crossbody',     price: 212, tag: 'New',        material: 'Waxed canvas',       category: 'Crossbody',  color: 'Olive' },
  { id: 3,  name: 'Glen Walker Pack',       price: 295, tag: null,         material: 'Cordura nylon',       category: 'Backpacks',  color: 'Slate' },
  { id: 4,  name: 'Fell Daypack',           price: 178, tag: 'Limited',    material: 'Recycled twill',      category: 'Backpacks',  color: 'Forest' },
  { id: 5,  name: 'Cairn Weekender',        price: 340, tag: 'New',        material: 'Full-grain leather',  category: 'Holdalls',   color: 'Tan' },
  { id: 6,  name: 'Bogland Belt Bag',       price: 98,  tag: null,         material: 'Waxed canvas',        category: 'Belt bags',  color: 'Black' },
  { id: 7,  name: 'Tor Shoulder Bag',       price: 165, tag: 'Bestseller', material: 'Vegetable-tan hide',  category: 'Crossbody',  color: 'Rust' },
  { id: 8,  name: 'Scarp Hiking Pack',      price: 255, tag: null,         material: 'Cordura nylon',       category: 'Backpacks',  color: 'Olive' },
  { id: 9,  name: 'Dene Canvas Tote',       price: 88,  tag: null,         material: 'Recycled canvas',     category: 'Totes',      color: 'Ecru' },
  { id: 10, name: 'Crest Laptop Sleeve',    price: 72,  tag: 'New',        material: 'Boiled wool + leather', category: 'Accessories', color: 'Charcoal' },
  { id: 11, name: 'Knoll Mini Crossbody',   price: 135, tag: null,         material: 'Full-grain leather',  category: 'Crossbody',  color: 'Black' },
  { id: 12, name: 'Brae Holdall',           price: 310, tag: 'Limited',    material: 'Waxed canvas',        category: 'Holdalls',   color: 'Forest' },
]

const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))]
const SORT_OPTIONS = [
  { label: 'Featured',     value: 'featured' },
  { label: 'Price: low',   value: 'price-asc' },
  { label: 'Price: high',  value: 'price-desc' },
  { label: 'Name A–Z',     value: 'name' },
]

const INITIAL_SHIPPING = {
  fullName: '',
  address: '',
  city: '',
  postcode: '',
  country: '',
  phone: '',
}

function ProductList() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [user, setUser] = useState({ email: '', password: '' })
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [cart, setCart] = useState([])
  const [shipping, setShipping] = useState(INITIAL_SHIPPING)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const filtered = useMemo(() => {
    let list = activeCategory === 'All'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter(p => p.category === activeCategory)

    if (sortBy === 'price-asc')  return [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'name')       return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, sortBy])

  const cartItems = cart.map(item => {
    const product = ALL_PRODUCTS.find(p => p.id === item.id)
    return { ...product, quantity: item.quantity }
  })

  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingCost = cartQuantity ? 15 : 0
  const taxAmount = Math.round(cartSubtotal * 0.08)
  const orderTotal = cartSubtotal + shippingCost + taxAmount

  function handleUserChange(event) {
    const { name, value } = event.target
    setUser(current => ({ ...current, [name]: value }))
    setLoginError('')
  }

  function handleLogin(event) {
    event.preventDefault()
    if (!user.email.includes('@') || user.password.length < 5) {
      setLoginError('Enter a valid email and password with at least 5 characters.')
      return
    }
    setLoggedIn(true)
    setLoginError('')
  }

  function handleLogout() {
    setLoggedIn(false)
    setUser({ email: '', password: '' })
    setCheckoutSuccess(false)
    setCheckoutError('')
  }

  function handleAdd(productId) {
    setCart(current => {
      const existing = current.find(item => item.id === productId)
      if (existing) {
        return current.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { id: productId, quantity: 1 }]
    })
    setCheckoutSuccess(false)
  }

  function handleRemove(productId) {
    setCart(current => current.filter(item => item.id !== productId))
  }

  function handleQuantity(productId, delta) {
    setCart(current => current.flatMap(item => {
      if (item.id !== productId) return item
      const nextQty = item.quantity + delta
      return nextQty > 0 ? { ...item, quantity: nextQty } : []
    }))
    setCheckoutSuccess(false)
  }

  function handleShippingChange(event) {
    const { name, value } = event.target
    setShipping(current => ({ ...current, [name]: value }))
    setCheckoutError('')
  }

  function handleCheckout(event) {
    event.preventDefault()
    if (!loggedIn) {
      setCheckoutError('Please sign in before checking out.')
      return
    }
    if (!cartQuantity) {
      setCheckoutError('Add items to your cart before checkout.')
      return
    }
    const missing = Object.entries(shipping).filter(([, value]) => !value)
    if (missing.length > 0) {
      setCheckoutError('Complete all shipping details to place your order.')
      return
    }
    setCheckoutSuccess(true)
    setCheckoutError('')
    setCart([])
  }

  const steps = [
    { title: 'Sign in', subtitle: 'Access the shop', done: loggedIn },
    { title: 'Browse', subtitle: 'Choose your favorites', done: cartQuantity > 0 },
    { title: 'Checkout', subtitle: 'Place your order', done: checkoutSuccess },
  ]

  return (
    <div className="shop-page">
      <section className="shop-hero">
        <div className="shop-hero__content">
          <p className="shop-eyebrow">Shop</p>
          <h1 className="shop-heading">Complete shopping flow</h1>
          <p className="shop-copy">
            Sign in, browse products, add to cart, and complete checkout with shipping details.
          </p>
        </div>
        <div className="shop-steps" aria-label="Shopping process steps">
          {steps.map((step, index) => (
            <div key={step.title} className={`shop-step ${step.done ? 'shop-step--done' : ''}`}>
              <span className="shop-step__index">{index + 1}</span>
              <div>
                <p className="shop-step__title">{step.title}</p>
                <p className="shop-step__subtitle">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shop-summary-grid">
        <div className="shop-card shop-card--highlight">
          {loggedIn ? (
            <div className="shop-account-info">
              <p className="shop-account__eyebrow">Signed in</p>
              <h2 className="shop-account__title">Welcome back</h2>
              <p className="shop-account__user">{user.email}</p>
              <button type="button" className="btn btn--outline" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          ) : (
            <form className="shop-login" onSubmit={handleLogin}>
              <p className="shop-account__eyebrow">Customer login</p>
              <h2 className="shop-account__title">Sign in to continue</h2>
              <label className="shop-label" htmlFor="email">
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleUserChange}
                  className="shop-input"
                  placeholder="hello@heel.com"
                  required
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
                />
              </label>
              {loginError && <p className="shop-error">{loginError}</p>}
              <button type="submit" className="btn btn--primary">Sign in</button>
            </form>
          )}
        </div>

        <div className="shop-card shop-card--summary">
          <div className="shop-summary-item">
            <p className="shop-summary__label">Cart items</p>
            <p className="shop-summary__value">{cartQuantity}</p>
          </div>
          <div className="shop-summary-item">
            <p className="shop-summary__label">Order total</p>
            <p className="shop-summary__value">GH₵{cartSubtotal}</p>
          </div>
          <div className="shop-summary-item shop-summary-item--note">
            <p>Shipping is GH₵15 per order, tax is 8%.</p>
          </div>
        </div>
      </section>

      <section className="shop-controls">
        <div className="shop-filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`shop-filter-btn${activeCategory === cat ? ' shop-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="shop-sort">
          <label htmlFor="sort" className="shop-sort__label">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="shop-sort__select"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="shop-layout">
        <main className="shop-products">
          <div className="shop-products__header">
            <div>
              <p className="shop-products__label">Browse</p>
              <h2 className="shop-products__title">The full collection</h2>
            </div>
            {checkoutSuccess && (
              <div className="shop-notice">Order placed successfully.</div>
            )}
          </div>

          <ul className="product-grid" role="list">
            {filtered.map(product => (
              <li key={product.id} className="product-card">
                <div className="product-card__image">
                  <div className="product-card__placeholder" aria-hidden="true" />
                  {product.tag && <span className="product-card__tag">{product.tag}</span>}
                  <div className="product-card__color-dot" title={product.color} aria-label={`Colour: ${product.color}`} />
                </div>
                <div className="product-card__body">
                  <p className="product-card__material">{product.material}</p>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__meta">{product.category} · {product.color}</p>
                  <div className="product-card__footer">
                    <span className="product-card__price">GH₵{product.price}</span>
                    <button
                      type="button"
                      className={`btn btn--add${cart.find(item => item.id === product.id) ? ' btn--added' : ''}`}
                      onClick={() => handleAdd(product.id)}
                    >
                      {cart.find(item => item.id === product.id) ? 'Add more' : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>

        <aside className="shop-cart">
          <div className="shop-card shop-cart__panel">
            <div className="shop-cart__header">
              <p className="shop-cart__eyebrow">Your cart</p>
              <p className="shop-cart__meta">{cartQuantity} item{cartQuantity === 1 ? '' : 's'}</p>
            </div>

            {cartQuantity === 0 ? (
              <div className="shop-cart__empty">
                <p>Your cart is empty. Add products to continue.</p>
              </div>
            ) : (
              <ul className="shop-cart__items">
                {cartItems.map(item => (
                  <li key={item.id} className="shop-cart__item">
                    <div>
                      <p className="shop-cart__item-name">{item.name}</p>
                      <p className="shop-cart__item-meta">GH₵{item.price} · {item.color}</p>
                    </div>
                    <div className="shop-cart__actions">
                      <div className="shop-cart__qty">
                        <button type="button" onClick={() => handleQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => handleQuantity(item.id, 1)}>+</button>
                      </div>
                      <button type="button" className="shop-cart__remove" onClick={() => handleRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="shop-order-summary">
              <div className="shop-order-row">
                <span>Subtotal</span>
                <span>GH₵{cartSubtotal}</span>
              </div>
              <div className="shop-order-row">
                <span>Shipping</span>
                <span>GH₵{shippingCost}</span>
              </div>
              <div className="shop-order-row">
                <span>Tax</span>
                <span>GH₵{taxAmount}</span>
              </div>
              <div className="shop-order-row shop-order-row--total">
                <span>Total</span>
                <span>GH₵{orderTotal}</span>
              </div>
            </div>

            <form className="shop-checkout" onSubmit={handleCheckout}>
              <p className="shop-checkout__heading">Shipping details</p>
              <label className="shop-label">
                Full name
                <input
                  name="fullName"
                  value={shipping.fullName}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="shop-label">
                Address
                <input
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="123 Ridge Street"
                />
              </label>
              <div className="shop-checkout__row">
                <label className="shop-label">
                  City
                  <input
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    className="shop-input"
                    placeholder="City"
                  />
                </label>
                <label className="shop-label">
                  Postal code
                  <input
                    name="postcode"
                    value={shipping.postcode}
                    onChange={handleShippingChange}
                    className="shop-input"
                    placeholder="Postcode"
                  />
                </label>
              </div>
              <label className="shop-label">
                Country
                <input
                  name="country"
                  value={shipping.country}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="Ghana"
                />
              </label>
              <label className="shop-label">
                Phone
                <input
                  name="phone"
                  value={shipping.phone}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="+233 24 000 0000"
                />
              </label>
              {checkoutError && <p className="shop-error">{checkoutError}</p>}
              <button type="submit" className="btn btn--primary" disabled={!loggedIn || cartQuantity === 0}>
                Place order
              </button>
            </form>
          </div>
        </aside>
      </div>

      <footer className="shop-footer">
        <div>
          <p className="shop-footer__title">Still browsing?</p>
          <p className="shop-footer__copy">A shop is complete when browsing and checkout are intuitive.</p>
        </div>
        <nav className="shop-footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </footer>
    </div>
  )
}

export default ProductList
