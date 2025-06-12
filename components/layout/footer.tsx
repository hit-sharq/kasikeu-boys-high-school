import Link from "next/link"

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="footer-logo">K</div>
                <div className="footer-brand-text">
                  <h3>Kasikeu Boys High School</h3>
                  <p>Excellence in Education</p>
                </div>
              </div>
              <p className="footer-description">
                Shaping tomorrow's leaders through excellence in education, character development, and innovation. Join
                our community of learners and achievers.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  f
                </a>
                <a href="#" className="social-link">
                  t
                </a>
                <a href="#" className="social-link">
                  i
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/academics">Academics</Link>
                </li>
                <li>
                  <Link href="/admissions">Admissions</Link>
                </li>
                <li>
                  <Link href="/staff">Staff Directory</Link>
                </li>
                <li>
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link href="/news">News & Events</Link>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Info</h3>
              <div className="footer-contact">
                <div className="footer-contact-icon">📍</div>
                <div>
                  <p>P.O. Box 123-00100</p>
                  <p>Kasikeu, Kenya</p>
                </div>
              </div>
              <div className="footer-contact">
                <div className="footer-contact-icon">📞</div>
                <span>+254 700 000 000</span>
              </div>
              <div className="footer-contact">
                <div className="footer-contact-icon">✉️</div>
                <span>info@kasikeuboys.ac.ke</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Kasikeu Boys High School. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
