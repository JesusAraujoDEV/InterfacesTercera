import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer
      className="photography-footer"
      style={{ background: 'var(--color-primary)', color: 'var(--color-text)' }}
    >
      {/* Main Footer Content */}
      <div className="footer-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', padding: '3rem 2rem 2rem 2rem', background: 'var(--color-primary)', color: 'var(--color-text)' }}>
        {/* Brand Information */}
        <div className="footer-brand" style={{ flex: '1 1 220px', minWidth: 220, marginBottom: '2rem' }}>
          <div className="brand-title" style={{ marginBottom: '0.5rem' }}>
            <p className="brand-main" style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: 2, color: 'var(--color-accent)' }}>PHOTOGRAPHY</p>
            <p className="brand-sub" style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-neutral)' }}>BY LANDING</p>
          </div>
          <p className="brand-description" style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>Capturing special moments with art and passion.</p>

          <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" className="social-icon" aria-label="Instagram" style={{ color: 'var(--color-accent)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn" style={{ color: 'var(--color-accent)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook" style={{ color: 'var(--color-accent)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Dribbble" style={{ color: 'var(--color-accent)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section" style={{ flex: '1 1 180px', minWidth: 180, marginBottom: '2rem' }}>
          <h3 className="section-title" style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1rem' }}>Quick Links</h3>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Home</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Portfolio</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Services</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>About Me</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Contact</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Blog</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section" style={{ flex: '1 1 180px', minWidth: 180, marginBottom: '2rem' }}>
          <h3 className="section-title" style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1rem' }}>Services</h3>
          <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Wedding Photography</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Portrait Sessions</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Product Photography</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Corporate Events</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Family Sessions</a></li>
            <li><a href="#" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }}>Aerial Photography</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section" style={{ flex: '1 1 220px', minWidth: 220, marginBottom: '2rem' }}>
          <h3 className="section-title" style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: '1rem' }}>Contact Us</h3>
          <address className="contact-info" style={{ fontStyle: 'normal', color: 'var(--color-text)' }}>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <i className="fas fa-map-marker-alt contact-icon" style={{ color: 'var(--color-neutral)', marginRight: 8 }}></i>
              <span style={{ color: 'var(--color-text)' }}>123 Photography Street, Image City</span>
            </div>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <i className="fas fa-phone contact-icon" style={{ color: 'var(--color-neutral)', marginRight: 8 }}></i>
              <a href="tel:+1234567890" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>+1 234 567 890</a>
            </div>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <i className="fas fa-envelope contact-icon" style={{ color: 'var(--color-neutral)', marginRight: 8 }}></i>
              <a href="mailto:info@landingphotography.com" className="footer-link" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>info@landingphoto.com</a>
            </div>
            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
              <i className="fas fa-clock contact-icon" style={{ color: 'var(--color-neutral)', marginRight: 8 }}></i>
              <span style={{ color: 'var(--color-text)' }}>Mon-Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </address>

          {/* Newsletter Subscription */}
          <div className="newsletter" style={{ marginTop: '1.5rem' }}>
            <h4 className="newsletter-title" style={{ color: 'var(--color-accent)', fontWeight: 500, marginBottom: 8 }}>Subscribe to our newsletter</h4>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
                aria-label="Email for newsletter subscription"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  borderRadius: 6,
                  border: '1px solid var(--color-neutral)',
                  background: 'var(--color-secondary)',
                  color: 'var(--color-text)',
                  outline: 'none',
                  fontSize: '1rem',
                  marginRight: 4
                }}
              />
              <style>{`
                .newsletter-input::placeholder {
                  color: var(--color-text);
                  opacity: 1;
                }
              `}</style>
              <button
                type="submit"
                className="newsletter-button"
                aria-label="Subscribe"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-secondary)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="copyright-section" style={{ background: 'var(--color-accent)', color: 'var(--color-text)', padding: '1rem 2rem' }}>
        <div className="copyright-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div className="copyright-text" style={{ fontSize: '1rem', color: 'var(--color-text)' }}>&copy; {currentYear} Landing Photography. All rights reserved.</div>
          <div className="legal-links" style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" className="legal-link" style={{ color: 'var(--color-text)', textDecoration: 'underline', fontSize: '1rem' }}>Privacy Policy</a>
            <a href="#" className="legal-link" style={{ color: 'var(--color-text)', textDecoration: 'underline', fontSize: '1rem' }}>Terms of Service</a>
            <a href="#" className="legal-link" style={{ color: 'var(--color-text)', textDecoration: 'underline', fontSize: '1rem' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
