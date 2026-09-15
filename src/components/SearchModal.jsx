import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { BESTSELLERS } from '../data/products';

export default function SearchModal({ isOpen, onClose, onQuickView }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = BESTSELLERS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '680px',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Search AVORA</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--color-bg-hero)',
          padding: '0.85rem 1.25rem',
          borderRadius: '9999px',
          border: '1px solid var(--color-border)',
          marginBottom: '2rem'
        }}>
          <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search shampoo, oats, body lotion..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '1rem',
              color: 'var(--color-text-dark)'
            }}
            autoFocus
          />
        </div>

        <div>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            {query ? `Search Results (${filteredProducts.length})` : 'Popular Searches'}
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '320px', overflowY: 'auto' }}>
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  onQuickView(p);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-hero)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <img src={p.image} alt={p.name} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 500 }}>{p.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{p.category} • ${p.price.toFixed(2)}</span>
                </div>
                <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
