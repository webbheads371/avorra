'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              style={{ backgroundColor: cat.bgColor, color: cat.textColor }}
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-info">
                <h3 className="category-title">{cat.title}</h3>
                <p className="category-desc">{cat.description}</p>
                
                <span className="category-link">
                  <span>{cat.linkText}</span>
                  <ArrowRight size={15} />
                </span>
              </div>

              <div className="category-img-wrapper">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="category-img" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
