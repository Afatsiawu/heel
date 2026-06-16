import './Form.css'

const CATEGORIES = ['Stilettos', 'Block Heels', 'Wedges', 'Heeled Sandals', 'Pumps', 'Boots', 'Mules', 'Platforms']
const TAGS = ['', 'Bestseller', 'New', 'Limited']

function FormSection({ formData, onChange, onSubmit, submitted }) {
  return (
    <form className="hf" onSubmit={onSubmit} noValidate>

      <div className="hf__row">
        <label className="hf__label">
          Product title <span className="hf__required" aria-hidden="true">*</span>
          <input
            className="hf__input"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="e.g. Sable Stiletto"
            required
          />
        </label>
      </div>

      <div className="hf__row hf__row--split">
        <label className="hf__label">
          Category <span className="hf__required" aria-hidden="true">*</span>
          <select className="hf__select" name="category" value={formData.category} onChange={onChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>

        <label className="hf__label">
          Tag
          <select className="hf__select" name="tag" value={formData.tag} onChange={onChange}>
            {TAGS.map(t => <option key={t} value={t}>{t || '— None —'}</option>)}
          </select>
        </label>
      </div>

      <div className="hf__row hf__row--split">
        <label className="hf__label">
          Price <span className="hf__required" aria-hidden="true">*</span>
          <div className="hf__input-wrap">
            <span className="hf__prefix">GH₵</span>
            <input
              className="hf__input hf__input--prefixed"
              name="price"
              value={formData.price}
              onChange={onChange}
              placeholder="148"
              type="number"
              min="0"
              required
            />
          </div>
        </label>

        <label className="hf__label">
          Material
          <input
            className="hf__input"
            name="material"
            value={formData.material}
            onChange={onChange}
            placeholder="e.g. Suede"
          />
        </label>
      </div>

      <div className="hf__row">
        <label className="hf__label">
          Product Image <span className="hf__required" aria-hidden="true">*</span>
          <input
            className="hf__input"
            name="image"
            type="file"
            onChange={onChange}
            accept="image/*"
            required
          />
          {formData.imageFile && (
            <span className="hf__file-info">Selected: {formData.imageFile}</span>
          )}
        </label>
      </div>

      <div className="hf__row">
        <label className="hf__label">
          Description
          <textarea
            className="hf__textarea"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Describe the heel's features, dimensions, and feel."
            rows={4}
          />
        </label>
      </div>

      <div className="hf__footer">
        <p className="hf__required-note"><span className="hf__required">*</span> Required fields</p>
        <button
          type="submit"
          className={`hf__submit${submitted ? ' hf__submit--done' : ''}`}
          disabled={submitted}
        >
          {submitted ? '✓ Product added' : 'Add product'}
        </button>
      </div>

    </form>
  )
}

export default FormSection