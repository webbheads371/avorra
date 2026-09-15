import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function ReviewsSection() {
  return (
    <section className="reviews-section" id="wellness">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">COMMUNITY STORIES</span>
          <h2 className="section-title">Loved by 10,000+ Conscious Humans</h2>
        </div>

        <div className="reviews-grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="review-card">
              <div>
                <div className="review-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="review-quote">"{item.quote}"</p>
              </div>

              <div>
                <h4 className="review-author">{item.author}</h4>
                <span className="review-title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
