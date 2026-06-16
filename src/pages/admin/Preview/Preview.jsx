import './Preview.css'

function Preview({ products, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="pv-empty">
        <div className="pv-empty__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </div>
        <p className="pv-empty__title">No products yet</p>
        <p className="pv-empty__body">Fill in the form and click "Add product" to see a live preview here.</p>
      </div>
    )
  }

  return (
    <ul className="pv-list" role="list">
      {products.map(p => (
        <li key={p.id} className="pv-item">
          {/* Thumbnail */}
          <div className="pv-item__thumb">
            {p.imageUrl
              ? <img src={p.imageUrl} alt={p.title} className="pv-item__img" />
              : <div className="pv-item__placeholder" aria-hidden="true" />
            }
            {p.tag && <span className="pv-item__tag">{p.tag}</span>}
          </div>

          {/* Info */}
          <div className="pv-item__info">
            <div className="pv-item__meta">
              {p.material && <span className="pv-item__material">{p.material}</span>}
              <span className="pv-item__category">{p.category}</span>
            </div>
            <p className="pv-item__title">{p.title}</p>
            {p.description && (
              <p className="pv-item__desc">{p.description}</p>
            )}
          </div>

          {/* Price + actions */}
          <div className="pv-item__aside">
            <span className="pv-item__price">GH₵{p.price}</span>
            <button
              className="pv-item__delete"
              onClick={() => onDelete(p.id)}
              aria-label={`Remove ${p.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Preview