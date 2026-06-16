function ProductCard({ title, category, price, description, buttonText }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <div className="product-image"></div>
      </div>
      <div className="product-details">
        <h3>{title}</h3>
        <p className="product-color">{category}</p>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">{price}</span>
          <button type="button">{buttonText}</button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
