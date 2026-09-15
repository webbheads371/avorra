import React from 'react';
import { Droplet, Sparkles, ShieldCheck, SunMedium } from 'lucide-react';
import { INGREDIENTS } from '../data/products';

export default function IngredientSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Droplet': return <Droplet size={24} />;
      case 'Sparkle': return <Sparkles size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'SunMedium': return <SunMedium size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <section className="ingredients-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">THE BOTANICAL STANDARD</span>
          <h2 className="section-title">Powered by Pure Botanicals</h2>
        </div>

        <div className="ingredients-grid">
          {INGREDIENTS.map((item, idx) => (
            <div key={idx} className="ingredient-card">
              <div className="ingredient-icon">
                {getIcon(item.icon)}
              </div>
              <h3 className="ingredient-name">{item.name}</h3>
              <div className="ingredient-role">{item.role}</div>
              <p className="ingredient-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
