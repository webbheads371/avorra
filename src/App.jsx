'use client';

import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import BestsellersSection from './components/BestsellersSection';
import IngredientSection from './components/IngredientSection';
import ReviewsSection from './components/ReviewsSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import { BESTSELLERS } from './data/products';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'p1',
      name: 'Nourishing Shampoo',
      subtitle: 'With Plant Botanicals',
      category: 'Personal Care',
      price: 34.00,
      image: '/assets/hero_shampoo_bottle.jpg',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name || product.productName,
        subtitle: product.subtitle || product.category || 'Personal Care',
        category: product.category || 'Personal Care',
        price: product.price || 34.00,
        image: product.image,
        quantity: product.quantity || 1
      }];
    });
    showToast(`Added ${product.name || product.productName} to your bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert("Thank you for choosing AVORA! This is a replica demonstration checkout.");
    setIsCartOpen(false);
  };

  const handleSelectCategory = (catId) => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast(`Filtering category: ${catId.replace('-', ' ')}`);
  };

  return (
    <div className="app-container">
      {/* Top Banner & Header */}
      <AnnouncementBar />
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Main Content */}
      <main>
        {/* Exact Replica Hero Section */}
        <HeroSection 
          onShopHeroProduct={(slide) => {
            const heroProd = BESTSELLERS[0];
            setQuickViewProduct({
              ...heroProd,
              name: slide.productName,
              image: slide.image
            });
          }}
        />

        {/* 3 Category Tiles Section */}
        <CategorySection onSelectCategory={handleSelectCategory} />

        {/* Featured Bestsellers Section */}
        <BestsellersSection 
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Pure Botanical Ingredients Spotlight */}
        <IngredientSection />

        {/* Verified Community Reviews */}
        <ReviewsSection />

        {/* Newsletter Subscription */}
        <Newsletter onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide Drawer Cart */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
