'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, onOpenSearch, onOpenQuickView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Brand Logo */}
          <a href="#" className="logo">
            AVORA
          </a>

          {/* Navigation Links */}
          <nav className="nav-menu">
            <a href="#shop" className="nav-link">Shop</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#wellness" className="nav-link">Wellness</a>
            <a href="#journal" className="nav-link">Journal</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            <button 
              className="icon-btn" 
              onClick={onOpenSearch} 
              aria-label="Search"
              title="Search products"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>
            <button 
              className="icon-btn" 
              aria-label="Account" 
              title="User Account"
            >
              <User size={20} strokeWidth={1.8} />
            </button>
            <button 
              className="icon-btn" 
              onClick={onOpenCart} 
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="icon-btn mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e6e0d5',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Shop</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 500 }}>About</a>
          <a href="#wellness" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Wellness</a>
          <a href="#journal" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Journal</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 500 }}>Contact</a>
        </div>
      )}
    </header>
  );
}
