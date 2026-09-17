'use client';

import React, { useState } from 'react';
import { X, Star, Plus, Check } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('300ml');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity: qty, size: selectedSize });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quickview-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}
        >
          <X size={20} />
        </button>

        <img 
          src={product.image} 
          alt={product.name || product.productName} 
          className="quickview-img" 
        />

        <div className="quickview-details">
          <span className="product-category">{product.category || 'Personal Care'}</span>
          <h2 className="hero-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {product.name || product.productName}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
              <Star size={16} fill="currentColor" strokeWidth={0} />
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>4.9</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>(128 reviews)</span>
          </div>

          <div className="price-current" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
            ${product.price ? product.price.toFixed(2) : '34.00'}
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {product.description || product.subtitle || 'Formulated with cold-pressed jojoba, organic aloe vera, and silk amino acids for ultimate scalp health and strand resilience.'}
          </p>

          {/* Size selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Select Size
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['300ml', '500ml (Refill)'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: selectedSize === size ? '1.5px solid var(--color-sage-primary)' : '1px solid var(--color-border)',
                    backgroundColor: selectedSize === size ? 'var(--color-bg-hero)' : '#ffffff',
                    color: selectedSize === size ? 'var(--color-sage-primary)' : 'var(--color-text-dark)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add CTA */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="qty-controls" style={{ padding: '0.5rem 1rem' }}>
              <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span style={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button 
              className="checkout-btn" 
              onClick={handleAdd}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {added ? (
                <>
                  <Check size={18} />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add to Bag — ${( (product.price || 34.00) * qty ).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
