import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
        <div className="footer__brand">
          <span className="footer__logo">heels</span>
          <p className="footer__tagline">Made for high ground.</p>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Repairs</a>
          <a href="#">Stockists</a>
          <a href="#">Contact</a>
        </nav>
        <p className="footer__legal">© 2026 heels. All rights reserved.</p>
      </footer>
  )
}

export default Footer
