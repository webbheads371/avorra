'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle, Truck, Package, Clock, ArrowRight, ShieldCheck, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.orderId || 'ORD-8921';
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order details from API
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => {
        if (data.orders) {
          const found = data.orders.find(o => o.id === orderId);
          if (found) setOrder(found);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f0', color: '#2d3829', fontFamily: 'sans-serif', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '20px', padding: '3rem 2.5rem', border: '1px solid #e8e4db', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', textAlign: 'center' }}>
        
        {/* Animated Checkmark Badge */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 8px 20px rgba(46,125,50,0.15)'
        }}>
          <CheckCircle size={40} />
        </div>

        <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1.5px', color: '#666', textTransform: 'uppercase' }}>
          Payment Received • Order Confirmed
        </span>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'serif', color: '#2d3829', margin: '0.4rem 0 0.8rem' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2rem' }}>
          Order ID: <strong style={{ color: '#2d3829' }}>#{orderId}</strong>. We've sent a confirmation email & SMS with delivery tracking details.
        </p>

        {/* Live Order Stepper */}
        <div style={{ backgroundColor: '#f9faf8', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #e5e0d8' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.25rem', color: '#444' }}>
            Live Delivery Status
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#2d3829', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem' }}>
                <CheckCircle size={16} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2d3829' }}>Placed</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#2d3829', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem' }}>
                <Package size={16} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2d3829' }}>Processing</span>
            </div>

            <div style={{ textAlign: 'center', opacity: 0.5 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#ccc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem' }}>
                <Truck size={16} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#666' }}>Dispatched</span>
            </div>

            <div style={{ textAlign: 'center', opacity: 0.5 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#ccc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem' }}>
                <Home size={16} />
              </div>
              <span style={{ fontSize: '0.78rem', color: '#666' }}>Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        {order && (
          <div style={{ textAlign: 'left', backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e8e4db', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', fontFamily: 'serif', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
              Shipping Details
            </h4>
            <div style={{ fontSize: '0.9rem', color: '#444', display: 'grid', gap: '0.3rem' }}>
              <div><strong>Name:</strong> {order.customerName}</div>
              <div><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</div>
              <div><strong>Phone:</strong> {order.phone}</div>
              <div><strong>Payment Method:</strong> {order.paymentMethod}</div>
              <div><strong>Total Paid:</strong> ₹{order.total?.toLocaleString('en-IN')}</div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/" style={{
            backgroundColor: '#2d3829',
            color: '#fff',
            padding: '0.85rem 1.75rem',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            Continue Shopping
          </Link>
          <Link href="/admin" style={{
            backgroundColor: 'transparent',
            color: '#2d3829',
            border: '1px solid #2d3829',
            padding: '0.85rem 1.75rem',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            Open Admin Backend →
          </Link>
        </div>
      </div>
    </div>
  );
}
