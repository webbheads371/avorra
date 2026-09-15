import React from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { BESTSELLERS } from '../data/products';

export default function BestsellersSection({ onAddToCart, onQuickView }) {
  return (
    <section className="bestsellers-section" id="shop" style={{ padding: '4rem 0 6rem' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">CURATED SELECTION</span>
          <h2 className="section-title">AVORA Bestsellers</h2>
        </div>

        <div className="products-grid">
          {BESTSELLERS.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && <span className="product-badge">{product.badge}</span>}

              <div className="product-img-box">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-details">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-sub">{product.subtitle}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                    <Star size={14} fill="currentColor" strokeWidth={0} />
                  </div>
                  <span style={{ fontWeight: 600 }}>{product.rating}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>({product.reviewsCount})</span>
                </div>

                <div className="product-meta">
                  <div className="product-price">
                    <span className="price-current">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="price-old">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="icon-btn" 
                      onClick={() => onQuickView(product)}
                      title="Quick view"
                      style={{ border: '1px solid var(--color-border)', width: 34, height: 34 }}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="add-btn" 
                      onClick={() => onAddToCart(product)}
                    >
                      <Plus size={15} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
