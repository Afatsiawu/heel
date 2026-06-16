import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useShop } from './ShopContext'

export default function ShopCheckout() {
  const {
    cartQuantity,
    cartSubtotal,
    shippingCost,
    taxAmount,
    orderTotal,
    checkoutSuccess,
    checkoutError,
    shipping,
    handleShippingChange,
    handleCheckout,
    loggedIn,
  } = useShop()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/shop/login', { replace: true })
    }
  }, [loggedIn, navigate])

  return (
    <section className="shop-section shop-section--checkout">
      <div className="shop-panel shop-panel--wide">
        <h2 className="shop-panel__title" style={{ marginBottom: '2rem' }}>Checkout</h2>

        {checkoutSuccess ? (
          <div className="shop-card shop-card--status">
            <p className="shop-card__text">Your order is complete. Thank you for shopping with us!</p>
            <Link to="../browse" className="btn btn--primary" style={{ marginTop: '0.5rem' }}>Shop more</Link>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="shop-form shop-form--checkout">
            <div className="shop-order-summary shop-order-summary--checkout">
              <div className="shop-order-row">
                <span>Items Ordered</span>
                <span>{cartQuantity}</span>
              </div>
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

            <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1rem' }}>
              <label className="shop-label">
                Full name
                <input
                  name="fullName"
                  type="text"
                  required
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
                  type="text"
                  required
                  value={shipping.address}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="123 Ridge Street"
                />
              </label>
              <div className="shop-form__row">
                <label className="shop-label">
                  City
                  <input
                    name="city"
                    type="text"
                    required
                    value={shipping.city}
                    onChange={handleShippingChange}
                    className="shop-input"
                    placeholder="Accra"
                  />
                </label>
                <label className="shop-label">
                  Postal code
                  <input
                    name="postcode"
                    type="text"
                    required
                    value={shipping.postcode}
                    onChange={handleShippingChange}
                    className="shop-input"
                    placeholder="00233"
                  />
                </label>
              </div>
              <label className="shop-label">
                Country
                <input
                  name="country"
                  type="text"
                  required
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
                  type="tel"
                  required
                  value={shipping.phone}
                  onChange={handleShippingChange}
                  className="shop-input"
                  placeholder="+233 24 000 0000"
                />
              </label>
            </div>

            {checkoutError && <p className="shop-error" role="alert">{checkoutError}</p>}
            
            <div className="shop-browse-footer">
              <Link to="../cart" className="btn btn--outline">Back to cart</Link>
              <button type="submit" className="btn btn--primary" disabled={!loggedIn || cartQuantity === 0}>
                Place order
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}