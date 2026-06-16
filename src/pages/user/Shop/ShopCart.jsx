import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useShop } from './ShopContext'

export default function ShopCart() {
  const {
    cartItems,
    cartQuantity,
    cartSubtotal,
    shippingCost,
    taxAmount,
    orderTotal,
    handleQuantity,
    handleRemove,
    loggedIn,
  } = useShop()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/shop/login', { replace: true })
    }
  }, [loggedIn, navigate])

  return (
    <section className="shop-section shop-section--cart">
      <div className="shop-panel shop-panel--wide">
        <h2 className="shop-panel__title" style={{ marginBottom: '2rem' }}>Your Cart</h2>

        {cartQuantity === 0 ? (
          <div className="shop-card shop-card--empty">
            <p className="shop-card__text">Your shopping cart is empty.</p>
            <Link to="../browse" className="btn btn--primary">Browse products</Link>
          </div>
        ) : (
          <>
            <ul className="shop-cart__items">
              {cartItems.map(item => (
                <li key={item.id} className="shop-cart__item">
                  <div>
                    <h3 className="shop-cart__item-name">{item.name}</h3>
                    <p className="shop-cart__item-meta">GH₵{item.price} · {item.color}</p>
                  </div>
                  <div className="shop-cart__actions">
                    <div className="shop-cart__qty">
                      <button type="button" aria-label="Decrease quantity" onClick={() => handleQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => handleQuantity(item.id, 1)}>+</button>
                    </div>
                    <button type="button" className="shop-cart__remove" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shop-order-summary shop-order-summary--cart">
              <div className="shop-order-row">
                <span>Subtotal</span>
                <span>GH₵{cartSubtotal}</span>
              </div>
              <div className="shop-order-row">
                <span>Shipping</span>
                <span>GH₵{shippingCost}</span>
              </div>
              <div className="shop-order-row">
                <span>Tax (8%)</span>
                <span>GH₵{taxAmount}</span>
              </div>
              <div className="shop-order-row shop-order-row--total">
                <span>Total</span>
                <span>GH₵{orderTotal}</span>
              </div>
            </div>

            <div className="shop-browse-footer">
              <Link to="../browse" className="btn btn--outline">Continue browsing</Link>
              <Link to="../checkout" className="btn btn--primary">Proceed to checkout</Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}