import { Link } from 'react-router-dom'
import './Home.css'

const HeelSilhouette = () => (
  <svg className="hero__heel" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,280 C120,220 240,160 400,180 C560,200 620,260 720,240 C820,220 880,160 1040,140 C1200,120 1320,180 1440,160 L1440,320 L0,320 Z" className="heel heel--back" />
    <path d="M0,300 C80,260 200,200 340,210 C480,220 560,280 680,270 C800,260 900,200 1060,185 C1220,170 1340,230 1440,210 L1440,320 L0,320 Z" className="heel heel--mid" />
    <path d="M0,315 C100,290 220,250 380,255 C540,260 620,300 760,295 C900,290 1000,255 1160,240 C1320,225 1400,270 1440,260 L1440,320 L0,320 Z" className="heel heel--fore" />
  </svg>
)

const featuredProducts = [
  { id: 1, name: 'Summit Ridge Tote', price: 148, tag: 'Bestseller', material: 'Full-grain leather' },
  { id: 2, name: 'Moorland Crossbody', price: 212, tag: 'New', material: 'Waxed canvas' },
  { id: 3, name: 'Glen Walker Pack', price: 295, tag: null, material: 'Cordura nylon' },
  { id: 4, name: 'Fell Daypack', price: 178, tag: 'Limited', material: 'Recycled twill' },
]

function Home() {
  return (
    <div className="page">
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Crafted for the climb</p>
          <h1 className="hero__headline">
            Carry the<br />
            <em>heel</em> with you.
          </h1>
          <p className="hero__body">
            Bags and accessories made for people who find their best thinking on high ground.
            Every stitch placed where the land demands it.
          </p>
          <div className="hero__actions">
            <Link to="/shop" className="btn btn--primary">Shop the collection</Link>
            <a href="#about" className="btn btn--ghost">Our story</a>
          </div>
        </div>
        <HeelSilhouette />
      </section>

      {/* ── Trust bar ──────────────────────────────────── */}
      <div className="trustbar">
        <span>Free shipping over GH₵200</span>
        <span className="trustbar__dot" aria-hidden="true" />
        <span>Lifetime repair guarantee</span>
        <span className="trustbar__dot" aria-hidden="true" />
        <span>Carbon-neutral shipping</span>
      </div>

      {/* ── Featured collection ────────────────────────── */}
      <section className="collection" id="collection">
        <header className="collection__header">
          <div>
            <p className="section-eyebrow">Current season</p>
            <h2 className="section-title">The Highlands Edit</h2>
          </div>
          <Link to="/shop" className="btn btn--outline collection__view-all">
            View all products
          </Link>
        </header>

        <ul className="product-grid" role="list">
          {featuredProducts.map(p => (
            <li key={p.id} className="product-card">
              <Link to="/shop" className="product-card__image-link">
                <div className="product-card__image">
                  <div className="product-card__placeholder" aria-hidden="true" />
                  {p.tag && <span className="product-card__tag">{p.tag}</span>}
                </div>
              </Link>
              <div className="product-card__info">
                <p className="product-card__material">{p.material}</p>
                <h3 className="product-card__name">{p.name}</h3>
                <div className="product-card__footer">
                  <span className="product-card__price">GH₵{p.price}</span>
                  <button className="btn btn--add" aria-label={`Add GH₵{p.name} to bag`}>Add to bag</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── About ──────────────────────────────────────── */}
      <section className="about" id="about">
        <div className="about__terrain" aria-hidden="true">
          <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,160 C80,100 180,60 300,80 C420,100 520,140 720,110 C920,80 1100,140 1440,120 L1440,220 L0,220 Z" fill="#a8e6cf" opacity="0.22" />
            <path d="M0,185 C150,145 300,115 500,130 C700,145 900,175 1200,160 C1320,155 1380,170 1440,165 L1440,220 L0,220 Z" fill="#a8e6cf" opacity="0.38" />
          </svg>
        </div>
        <div className="about__content">
          <p className="section-eyebrow">Why heel</p>
          <h2 className="about__headline">Design begins at altitude.</h2>
          <p className="about__body">
            Every heel product is tested across three seasons on the fells of
            Northumberland before it sees a shelf. We prototype on the heel so you
            never have to worry about it once you're there.
          </p>
          <a href="#" className="btn btn--outline-light">Read the manifesto</a>
        </div>
      </section>

      {/* ── Repairs ────────────────────────────────────── */}
      <section className="info-strip" id="repairs">
        <div className="info-strip__item">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          <h3 className="info-strip__title">Repairs</h3>
          <p className="info-strip__body">Send it back, we'll fix it. Every heel piece comes with a lifetime repair guarantee — no questions, no fees.</p>
          <a href="#" className="info-strip__link">Book a repair →</a>
        </div>
        <div className="info-strip__divider" aria-hidden="true" />
        <div className="info-strip__item" id="stockists">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <h3 className="info-strip__title">Stockists</h3>
          <p className="info-strip__body">Find heel in independent outdoor shops across the UK, Ireland, and Scandinavia. Explore your nearest stockist.</p>
          <a href="#" className="info-strip__link">Find a stockist →</a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer__brand">
          <span className="footer__logo">heel</span>
          <p className="footer__tagline">Made for high ground.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <Link to="/shop">Shop</Link>
          <a href="#about">About</a>
          <a href="#repairs">Repairs</a>
          <a href="#stockists">Stockists</a>
          <a href="mailto:hello@heel.com">Contact</a>
        </nav>
        <p className="footer__legal">© 2026 heel. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Home