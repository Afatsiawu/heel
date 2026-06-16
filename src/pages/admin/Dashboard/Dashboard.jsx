import { useState, useEffect } from 'react'
import './Dashboard.css'
import FormSection from '../Form/Form'
import Preview from '../Preview/Preview'
import Orders from '../Orders/Orders'

const initialForm = {
  title: '',
  category: 'Stilettos',
  price: '',
  imageUrl: '',
  imageFile: null,
  material: '',
  tag: '',
  description: '',
}

const STATS = [
  { label: 'Total products', value: '12' },
  { label: 'Categories', value: '6' },
  { label: 'Featured tags', value: '3' },
  { label: 'Avg. price', value: 'GH₵185' },
]

function Dashboard() {
  const [formData, setFormData] = useState(initialForm)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [activeSection, setActiveSection] = useState('products')

  useEffect(() => {
    const savedOrders = localStorage.getItem('heels_orders')
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error('Error loading orders:', e)
      }
    }
  }, [])

  function handleChange(event) {
    const { name, value, type, files } = event.target
    if (type === 'file' && files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((current) => ({
          ...current,
          imageUrl: e.target.result,
          imageFile: file.name,
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setFormData((current) => ({ ...current, [name]: value }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!formData.title || !formData.price || !formData.imageUrl) return

    setProducts((current) => [
      { id: Date.now(), ...formData },
      ...current,
    ])
    setFormData(initialForm)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2200)
  }

  function handleDelete(id) {
    setProducts((current) => current.filter(p => p.id !== id))
  }

  function handleDeleteOrder(id) {
    setOrders((current) => {
      const updated = current.filter(o => o.id !== id)
      localStorage.setItem('heels_orders', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="dash">

      {/* ── Sidebar ───────────────────────────────────── */}
      <aside className="dash__sidebar">
        <div className="dash__brand">
          <span className="dash__logo">Hills</span>
          <span className="dash__admin-badge">Admin</span>
        </div>

        <nav className="dash__nav" aria-label="Admin navigation">
          <button
            onClick={() => setActiveSection('products')}
            className={`dash__nav-item${activeSection === 'products' ? ' dash__nav-item--active' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Products
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className={`dash__nav-item${activeSection === 'orders' ? ' dash__nav-item--active' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Orders
          </button>
        </nav>

        <a href="/" className="dash__nav-item dash__nav-item--storefront">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          View storefront
        </a>
      </aside>

      {/* ── Main ──────────────────────────────────────── */}
      <main className="dash__main">

        {/* Page header */}
        <header className="dash__header">
          <div>
            <p className="dash__eyebrow">Admin dashboard</p>
            <h1 className="dash__title">{activeSection === 'products' ? 'Products' : 'Orders'}</h1>
          </div>
          <div className="dash__header-meta">
            <span className="dash__product-count">
              {activeSection === 'products' 
                ? `${products.length} added this session`
                : `${orders.length} total orders`
              }
            </span>
          </div>
        </header>

        {activeSection === 'products' && (
          <>
            {/* Stats row */}
            <div className="dash__stats">
              {STATS.map(s => (
                <div key={s.label} className="dash__stat">
                  <span className="dash__stat-value">{s.value}</span>
                  <span className="dash__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Form + preview split */}
            <div className="dash__body">
              <div className="dash__form-col">
                <div className="dash__panel">
                  <h2 className="dash__panel-title">Add new product</h2>
                  <FormSection
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitted={submitted}
                  />
                </div>
              </div>

              <div className="dash__preview-col">
                <div className="dash__panel">
                  <h2 className="dash__panel-title">
                    Live preview
                    {products.length > 0 && (
                      <span className="dash__preview-count">{products.length}</span>
                    )}
                  </h2>
                  <Preview products={products} onDelete={handleDelete} />
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'orders' && (
          <div className="dash__body">
            <div className="dash__orders-col">
              <div className="dash__panel">
                <h2 className="dash__panel-title">Customer Orders</h2>
                <Orders orders={orders} onDeleteOrder={handleDeleteOrder} />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default Dashboard