import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <div className="logo" style={{ color: '#ffffff' }}>AVORA</div>
            <p className="footer-desc">
              Care for today, a healthier tomorrow. Crafting clean, naturally derived personal care and wholesome nutrition for a brighter future.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Shop</h4>
            <ul className="footer-links">
              <li><a href="#shop">Personal Care</a></li>
              <li><a href="#shop">Food & Nutrition</a></li>
              <li><a href="#shop">Mother & Baby</a></li>
              <li><a href="#shop">Bestsellers</a></li>
              <li><a href="#shop">Gift Sets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">About AVORA</h4>
            <ul className="footer-links">
              <li><a href="#about">Our Story</a></li>
              <li><a href="#about">Botanical Philosophy</a></li>
              <li><a href="#about">Sustainability</a></li>
              <li><a href="#journal">Journal & Rituals</a></li>
              <li><a href="#about">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#contact">Shipping & Returns</a></li>
              <li><a href="#contact">FAQs</a></li>
              <li><a href="#contact">Track Order</a></li>
              <li><a href="#contact">Store Locator</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AVORA Care Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
