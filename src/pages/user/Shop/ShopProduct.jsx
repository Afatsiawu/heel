import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useShop } from './ShopContext'

export default function ShopProduct() {
  const { loggedIn, ALL_PRODUCTS, handleAdd, cart } = useShop()
  const { productId } = useParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!loggedIn) {
      navigate('/shop/login', { replace: true })
    }
  }, [loggedIn, navigate])

  const product = ALL_PRODUCTS.find(p => p.id === parseInt(productId, 10))

  if (!product) {
    return (
      <section className="shop-section shop-section--product">
        <div className="shop-panel shop-panel--wide">
          <p>Product not found.</p>
          <Link to="../browse" className="btn btn--primary">Back to browse</Link>
        </div>
      </section>
    )
  }

  const shareUrl = `${window.location.origin}/shop/product/${product.id}`
  const inCart = cart.find(item => item.id === product.id)

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const availableColors = ['Black', 'Chestnut', 'Bone', 'Red', 'Nude', 'Ebony', 'Emerald', 'Rose', 'Silver', 'Olive', 'Blush', 'White']

  return (
    <section className="shop-section shop-section--product">
      <div className="shop-panel shop-panel--wide">
        <Link to="../browse" className="product-back-link">← Back to products</Link>

        <div className="product-detail">
          <div className="product-detail__image">
            <div className="product-detail__placeholder" aria-hidden="true" />
            {product.tag && <span className="product-detail__tag">{product.tag}</span>}
          </div>

          <div className="product-detail__info">
            <div className="product-detail__header">
              <div>
                <p className="product-detail__category">{product.category}</p>
                <h1 className="product-detail__title">{product.name}</h1>
              </div>
              <p className="product-detail__price">GH₵{product.price}</p>
            </div>

            <div className="product-detail__specs">
              <div className="spec-item">
                <span className="spec-label">Heel type</span>
                <span className="spec-value">{product.heelType}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Heel height</span>
                <span className="spec-value">{product.heelHeight}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Material</span>
                <span className="spec-value">{product.material}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Default color</span>
                <span className="spec-value">{product.color}</span>
              </div>
            </div>

            <div className="product-detail__description">
              <h3>About this heel</h3>
              <p>
                Expertly crafted with premium {product.material.toLowerCase()}, this {product.heelType.toLowerCase()} combines timeless elegance with comfortable wear. 
                The {product.heelHeight} heel provides the perfect balance of style and wearability.
                Available in {product.color} with a sleek, sophisticated finish.
              </p>
            </div>

            <div className="product-detail__colors">
              <h3>Available colors</h3>
              <div className="color-palette">
                {availableColors.map(col => (
                  <div key={col} className="color-swatch" title={col} aria-label={col}>
                    <div className="color-swatch__dot" />
                    <span className="color-swatch__label">{col}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-detail__actions">
              <button
                type="button"
                className={`btn btn--primary${inCart ? ' btn--in-cart' : ''}`}
                onClick={() => handleAdd(product.id)}
              >
                {inCart ? 'Already in cart' : 'Add to cart'}
              </button>
              <Link to="../cart" className="btn btn--outline">View cart</Link>
            </div>

            <div className="product-detail__share">
              <h3>Share this shoe</h3>
              <div className="share-link">
                <input type="text" value={shareUrl} readOnly className="share-link__input" />
                <button
                  type="button"
                  className={`btn btn--outline${copied ? ' btn--copied' : ''}`}
                  onClick={handleCopyLink}
                >
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
              <p className="share-info">Share this link to send a friend directly to this shoe.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
