'use client';

import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 999.00;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} strokeWidth={1.8} />
            <h3 className="cart-title">Your Bag ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="shipping-bar">
          {remainingForFreeShipping > 0 ? (
            <span>Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>Free Carbon-Neutral Shipping</strong></span>
          ) : (
            <span style={{ color: 'var(--color-sage-primary)', fontWeight: 600 }}>You've unlocked Complimentary Free Shipping!</span>
          )}
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-dark)', marginBottom: '0.5rem' }}>Your bag is empty</p>
              <p style={{ fontSize: '0.88rem' }}>Discover our pure botanical hair, body, and nutrition care.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{item.subtitle || item.category}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: 16, textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      <button onClick={() => onRemoveItem(item.id)} style={{ color: 'var(--color-text-muted)' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', textAlign: 'center' }}>
              Taxes and shipping calculated at checkout
            </p>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
