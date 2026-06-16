import { Link } from 'react-router-dom'
import { useShop } from './ShopContext'


export default function ShopBrowse() {
  const {
    CATEGORIES,
    SORT_OPTIONS,
    cart,
    cartQuantity,
    filteredProducts,
    activeCategory,
    sortBy,
    handleAdd,
    setActiveCategory,
    setSortBy,
    handleLogout
  } = useShop()

  return (
    <section className="shop-section shop-section--browse">
      <div className="shop-panel shop-panel--wide">
        <div className="shop-panel__heading">
          <div>
            <h2 className="shop-panel__title">Browse Luxury Heels</h2>
          </div>
          <div className="shop-badge">{cartQuantity} item{cartQuantity === 1 ? '' : 's'} in cart</div>
        </div>

        <div className="shop-filter-row">
          <div className="shop-filters" role="group" aria-label="Filter products by category">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                className={`shop-filter-btn${activeCategory === category ? ' shop-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="shop-sort-label">
            Sort by
            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value)}
              className="shop-sort__select"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <ul className="product-grid" role="list">
          {filteredProducts.map(product => {
            const hasInCart = cart.find(item => item.id === product.id)
            return (
            <li key={product.id} className="product-card">
                <Link to={`../product/${product.id}`} className="product-card__link\">
                  <div className="product-card__image">
                    <div className="product-card__placeholder" aria-hidden="true" />
                    {product.tag && <span className="product-card__tag\">{product.tag}</span>}
                    <div 
                      className="product-card__color-dot" 
                      style={{ backgroundColor: product.color.toLowerCase() === 'nude' || product.color.toLowerCase() === 'bone' ? '#e6dfd3' : product.color.toLowerCase() }} 
                      title={product.color} 
                      aria-label={`Colour: ${product.color}`} 
                    />
                  </div>
                  <div className="product-card__body">
                    <p className="product-card__material\">{product.material} · {product.heelType}</p>
                    <h3 className="product-card__name\">{product.name}</h3>
                    <p className="product-card__meta\">{product.category} · {product.heelHeight}</p>
                    <div className="product-card__attributes\">
                      <span>{product.color}</span>
                      <span>{product.tag ? product.tag : 'Classic'}</span>
                    </div>
                  </div>
                </Link>
                <div className="product-card__footer">
                  <span className="product-card__price\">GH₵{product.price}</span>
                  <button
                    type="button"
                    className={`btn btn--add${hasInCart ? ' btn--added' : ''}`}
                    onClick={() => handleAdd(product.id)}
                  >
                    {hasInCart ? 'Add more' : 'Add to cart'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="shop-browse-footer">
          <button type="button" className="btn btn--outline" style={{marginRight: 'auto'}} onClick={handleLogout}>
            Sign out
          </button>
          <Link to="../cart" className="btn btn--primary">Go to cart</Link>
        </div>
      </div>
    </section>
  )
}