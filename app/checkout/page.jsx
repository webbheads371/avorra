'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, QrCode, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    paymentMethod: 'UPI (GPay / PhonePe / Paytm)'
  });

  useEffect(() => {
    // Load cart from localStorage or window
    const savedCart = localStorage.getItem('avorra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems([]);
      }
    } else {
      // Fallback sample item if cart empty
      setCartItems([
        {
          id: 'p1',
          name: 'AVORA Nourishing Botanical Shampoo',
          subtitle: 'Cold-Pressed Jojoba & Aloe Vera',
          price: 1499,
          image: '/assets/hero_shampoo_bottle.jpg',
          quantity: 1
        }
      ]);
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address} ${formData.landmark ? '(' + formData.landmark + ')' : ''}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: cartItems,
        subtotal: subtotal,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod: formData.paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        // Clear cart
        localStorage.removeItem('avorra_cart');
        // Redirect to success page
        router.push(`/order-success/${data.order.id}`);
      } else {
        alert('Failed to place order. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to order server');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f0', color: '#2d3829', fontFamily: 'sans-serif' }}>
      {/* Checkout Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e8e4db',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: '#2d3829', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Return to Store
          </Link>
          <span style={{ color: '#ccc' }}>|</span>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'serif', letterSpacing: '2px', textTransform: 'uppercase' }}>AVORA</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d3829', fontSize: '0.85rem' }}>
          <ShieldCheck size={18} color="#2d3829" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: 'serif', marginBottom: '1.5rem' }}>Express Checkout</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem' }}>
          {/* Left Column: Single Page Form */}
          <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gap: '1.5rem' }}>
            
            {/* Section 1: Customer Contact Info */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'serif', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#2d3829', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</span>
                Contact Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Mobile Number (for WhatsApp Updates) *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Address (India) */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'serif', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#2d3829', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</span>
                Shipping Address (India)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>House / Flat No., Building & Street Address *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Flat 402, Green Glen Layout, Bellandur"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Landmark (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Near Columbia Asia Hospital"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Pincode *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="560103"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>City / Town *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.92rem', background: '#fff' }}
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi / NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Indian Payment Options */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'serif', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#2d3829', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>3</span>
                Select Payment Method
              </h3>

              <div style={{ display: 'grid', gap: '0.8rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: formData.paymentMethod.includes('UPI') ? '2px solid #2d3829' : '1px solid #e0e0e0',
                  backgroundColor: formData.paymentMethod.includes('UPI') ? '#f9faf8' : '#fff',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio"
                    name="paymentMethod"
                    value="UPI (GPay / PhonePe / Paytm)"
                    checked={formData.paymentMethod.includes('UPI')}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <QrCode size={22} color="#2d3829" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Instant UPI (GPay / PhonePe / Paytm)</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Pay via any UPI app with 0 transaction fees</div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: formData.paymentMethod.includes('Card') ? '2px solid #2d3829' : '1px solid #e0e0e0',
                  backgroundColor: formData.paymentMethod.includes('Card') ? '#f9faf8' : '#fff',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio"
                    name="paymentMethod"
                    value="Credit / Debit Card (Razorpay)"
                    checked={formData.paymentMethod.includes('Card')}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <CreditCard size={22} color="#2d3829" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Credit / Debit Card & NetBanking</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Visa, Mastercard, RuPay, HDFC, ICICI, SBI</div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: formData.paymentMethod.includes('COD') ? '2px solid #2d3829' : '1px solid #e0e0e0',
                  backgroundColor: formData.paymentMethod.includes('COD') ? '#f9faf8' : '#fff',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery (COD)"
                    checked={formData.paymentMethod.includes('COD')}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <Truck size={22} color="#2d3829" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Pay cash upon arrival at your doorstep</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#2d3829',
                color: '#ffffff',
                padding: '1.25rem',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 600,
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(45,56,41,0.2)',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              {isSubmitting ? 'Processing Order...' : `Complete Order • ₹${grandTotal.toLocaleString('en-IN')}`}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #e8e4db',
              position: 'sticky',
              top: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'serif', marginBottom: '1.25rem', paddingBottom: '0.8rem', borderBottom: '1px solid #f0eae1' }}>
                Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', border: '1px solid #eee' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#666' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px dashed #e8e4db', paddingTop: '1rem', display: 'grid', gap: '0.6rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#2e7d32' }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: '#2d3829', paddingTop: '0.75rem', borderTop: '1px solid #e8e4db' }}>
                  <span>Total Amount</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Shipping Perks */}
              <div style={{ marginTop: '1.5rem', backgroundColor: '#f9faf8', padding: '1rem', borderRadius: '10px', fontSize: '0.82rem', color: '#444', display: 'grid', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2d3829', fontWeight: 600 }}>
                  <Truck size={14} /> Carbon-Neutral Express Shipping
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2d3829', fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> 100% Satisfaction Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
