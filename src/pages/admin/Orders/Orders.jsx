import './Orders.css'

function Orders({ orders, onDeleteOrder }) {
  if (orders.length === 0) {
    return (
      <div className="ord-empty">
        <div className="ord-empty__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <p className="ord-empty__title">No orders yet</p>
        <p className="ord-empty__body">Customer orders will appear here when they complete checkout.</p>
      </div>
    )
  }

  return (
    <div className="ord-list">
      {orders.map(order => (
        <div key={order.id} className="ord-card">
          <div className="ord-card__header">
            <div className="ord-card__meta">
              <p className="ord-card__id">Order #{order.id.toString().slice(-6)}</p>
              <p className="ord-card__date">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <button
              className="ord-card__delete"
              onClick={() => onDeleteOrder(order.id)}
              aria-label={`Delete order ${order.id}`}
              title="Delete order"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>
          </div>

          <div className="ord-card__customer">
            <div className="ord-row">
              <span className="ord-label">Customer</span>
              <span className="ord-value">{order.fullName}</span>
            </div>
            <div className="ord-row">
              <span className="ord-label">Email</span>
              <span className="ord-value">{order.email}</span>
            </div>
            <div className="ord-row">
              <span className="ord-label">Phone</span>
              <span className="ord-value">{order.phone}</span>
            </div>
          </div>

          <div className="ord-card__shipping">
            <h4>Shipping Address</h4>
            <div className="ord-row">
              <span className="ord-label">Address</span>
              <span className="ord-value">{order.address}</span>
            </div>
            <div className="ord-row">
              <span className="ord-label">City</span>
              <span className="ord-value">{order.city}</span>
            </div>
            <div className="ord-row">
              <span className="ord-label">Postcode</span>
              <span className="ord-value">{order.postcode}</span>
            </div>
            <div className="ord-row">
              <span className="ord-label">Country</span>
              <span className="ord-value">{order.country}</span>
            </div>
          </div>

          <div className="ord-card__items">
            <h4>Items</h4>
            <div className="ord-items-list">
              {order.items.map((item, idx) => (
                <div key={idx} className="ord-item-row">
                  <div className="ord-item-info">
                    <p className="ord-item-name">{item.name}</p>
                    <p className="ord-item-meta">{item.category} · {item.heelHeight}</p>
                  </div>
                  <div className="ord-item-details">
                    <span className="ord-item-qty">Qty: {item.quantity}</span>
                    <span className="ord-item-price">GH₵{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ord-card__summary">
            <div className="ord-row">
              <span>Subtotal</span>
              <span>GH₵{order.subtotal}</span>
            </div>
            <div className="ord-row">
              <span>Shipping</span>
              <span>GH₵{order.shipping}</span>
            </div>
            <div className="ord-row">
              <span>Tax (8%)</span>
              <span>GH₵{order.tax}</span>
            </div>
            <div className="ord-row ord-row--total">
              <span>Total</span>
              <span>GH₵{order.total}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
