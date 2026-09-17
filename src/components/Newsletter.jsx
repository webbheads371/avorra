'use client';

import React, { useState } from 'react';

export default function Newsletter({ onShowToast }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onShowToast('Welcome to the AVORA Circle! Check your inbox for 15% off.');
      setEmail('');
    }
  };

  return (
    <section className="container">
      <div className="newsletter-card">
        <h2 className="newsletter-title">Join the AVORA Circle</h2>
        <p className="newsletter-desc">
          Subscribe to receive botanical hair & skin care rituals, product drops, and 15% off your first order.
        </p>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
