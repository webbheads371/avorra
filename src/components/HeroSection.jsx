import React, { useState } from 'react';
import { Leaf, FlaskConical, Heart, ArrowRight, Droplets, Shield, Sparkles, Feather, Sun, CheckCircle2 } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';

export default function HeroSection({ onShopHeroProduct }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Helper to render icons dynamically
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Leaf': return <Leaf size={22} strokeWidth={1.6} />;
      case 'FlaskConical': return <FlaskConical size={22} strokeWidth={1.6} />;
      case 'Heart': return <Heart size={22} strokeWidth={1.6} />;
      case 'Droplets': return <Droplets size={22} strokeWidth={1.6} />;
      case 'Shield': return <Shield size={22} strokeWidth={1.6} />;
      case 'Sparkles': return <Sparkles size={22} strokeWidth={1.6} />;
      case 'Feather': return <Feather size={22} strokeWidth={1.6} />;
      case 'Sun': return <Sun size={22} strokeWidth={1.6} />;
      case 'CheckCircle2': return <CheckCircle2 size={22} strokeWidth={1.6} />;
      default: return <Leaf size={22} strokeWidth={1.6} />;
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column Content */}
          <div className="hero-content">
            <span className="hero-tagline">{currentSlide.tagline}</span>
            <h1 className="hero-title">{currentSlide.headline}</h1>
            <p className="hero-subtitle">{currentSlide.subtitle}</p>

            <button 
              className="hero-cta" 
              onClick={() => onShopHeroProduct(currentSlide)}
            >
              <span>{currentSlide.buttonText}</span>
              <ArrowRight size={18} />
            </button>

            {/* Feature Badges */}
            <div className="hero-features">
              {currentSlide.features.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <div className="feature-icon-wrapper">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="feature-label">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Product Photography with Pedestal */}
          <div className="hero-media-container">
            <div className="hero-image-wrapper">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.productName} 
                className="hero-product-img" 
              />
            </div>

            {/* Carousel Dots */}
            <div className="hero-dots">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`dot-btn ${currentSlideIndex === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Calligraphy & Stacked Details Panel */}
          <div className="hero-sidebar">
            <div className="sidebar-top">
              <span className="calligraphy-quote">
                Care<br />More<br />Naturally
              </span>

              <div className="sidebar-divider" />

              <div className="sidebar-menu">
                <span className="sidebar-item">PEOPLE</span>
                <span className="sidebar-item">WELLNESS</span>
                <span className="sidebar-item">A BRIGHTER TOMORROW</span>
              </div>
            </div>

            <div className="sidebar-bottom">
              <div className="brand-badge">
                <span className="brand-badge-name">AVORA</span>
                <span className="brand-badge-tag">A KINDER TOMORROW</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
