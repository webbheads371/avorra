'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, ShoppingCart, DollarSign, Plus, Edit2, Trash2, 
  CheckCircle, Clock, Truck, ShieldCheck, ArrowLeft, RefreshCw, Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Product Add/Edit
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Product Form Fields
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    category: 'Personal Care',
    price: '',
    originalPrice: '',
    stock: 50,
    badge: '',
    image: '/assets/hero_shampoo_bottle.jpg',
    description: ''
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Check if authenticated locally
    const auth = localStorage.getItem('avorra_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/orders').then(r => r.json())
      ]);
      if (prodRes.products) setProducts(prodRes.products);
      if (ordRes.orders) setOrders(ordRes.orders);
    } catch (err) {
      console.error('Failed fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'avorra') {
      setIsAuthenticated(true);
      localStorage.setItem('avorra_admin_auth', 'true');
      fetchData();
    } else {
      alert('Incorrect Password! Try "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('avorra_admin_auth');
  };

  // Open Add Product Modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      subtitle: '',
      category: 'Personal Care',
      price: '',
      originalPrice: '',
      stock: 50,
      badge: '',
      image: '/assets/hero_shampoo_bottle.jpg',
      description: ''
    });
    setShowProductModal(true);
  };

  // Open Edit Product Modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      subtitle: product.subtitle || '',
      category: product.category || 'Personal Care',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      stock: product.stock || 50,
      badge: product.badge || '',
      image: product.image || '/assets/hero_shampoo_bottle.jpg',
      description: product.description || ''
    });
    setShowProductModal(true);
  };

  // Save Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock, 10)
    };
    if (editingProduct) {
      payload.id = editingProduct.id;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setShowProductModal(false);
      }
    } catch (err) {
      alert('Failed to save product');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, orderStatus: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f6f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2.5rem',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid #e8e4db',
          textAlign: 'center'
        }}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            backgroundColor: '#2d3829',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#2d3829', marginBottom: '0.4rem', fontFamily: 'serif' }}>
            AVORA Admin
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '1.5rem' }}>
            Enter portal password to access local backend
          </p>

          <form onSubmit={handleLogin}>
            <input 
              type="password"
              placeholder="Enter Password (admin123)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '0.95rem',
                marginBottom: '1rem',
                outline: 'none'
              }}
              required
            />
            <button 
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#2d3829',
                color: '#fff',
                padding: '0.9rem',
                borderRadius: '8px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              Access Admin Portal
            </button>
          </form>

          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/" style={{ fontSize: '0.85rem', color: '#2d3829', textDecoration: 'underline' }}>
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f0', color: '#2d3829', fontFamily: 'sans-serif' }}>
      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#2d3829',
        color: '#ffffff',
        padding: '1.2rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontFamily: 'serif', letterSpacing: '1px' }}>AVORA Admin Portal</h1>
          <span style={{
            fontSize: '0.75rem',
            backgroundColor: 'rgba(212, 175, 55, 0.2)',
            color: '#d4af37',
            padding: '0.2rem 0.6rem',
            borderRadius: '100px',
            border: '1px solid #d4af37'
          }}>
            Local Backend Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} /> View Storefront
          </Link>
          <button 
            onClick={fetchData} 
            title="Refresh Data"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={14} /> Sync
          </button>
          <button 
            onClick={handleLogout}
            style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '0.45rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1.5rem' }}>
        {/* KPI Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>TOTAL REVENUE</span>
              <DollarSign size={20} color="#2d3829" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2d3829' }}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>TOTAL ORDERS</span>
              <ShoppingCart size={20} color="#2d3829" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2d3829' }}>{totalOrders}</h3>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e8e4db', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>ACTIVE PRODUCTS</span>
              <Package size={20} color="#2d3829" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2d3829' }}>{totalProducts}</h3>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e8e4db', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('products')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.92rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'products' ? '#2d3829' : 'transparent',
              color: activeTab === 'products' ? '#fff' : '#666'
            }}
          >
            📦 Products ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.92rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'orders' ? '#2d3829' : 'transparent',
              color: activeTab === 'orders' ? '#fff' : '#666'
            }}
          >
            🛒 Orders ({orders.length})
          </button>
        </div>

        {/* Products Management View */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontFamily: 'serif' }}>Catalog Products</h2>
              <button 
                onClick={openAddModal}
                style={{
                  backgroundColor: '#2d3829',
                  color: '#fff',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <Plus size={16} /> Add New Product
              </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8e4db', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2eee6', borderBottom: '1px solid #e8e4db', color: '#444' }}>
                    <th style={{ padding: '1rem' }}>Product</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>Price (₹)</th>
                    <th style={{ padding: '1rem' }}>Stock</th>
                    <th style={{ padding: '1rem' }}>Badge</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f0eae1' }}>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#2d3829' }}>{p.name}</div>
                          <div style={{ fontSize: '0.78rem', color: '#777' }}>{p.subtitle}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>{p.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>
                        ₹{p.price}
                        {p.originalPrice && (
                          <span style={{ fontSize: '0.78rem', color: '#999', textDecoration: 'line-through', marginLeft: '0.4rem' }}>
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          backgroundColor: p.stock > 10 ? '#e8f5e9' : '#ffebee',
                          color: p.stock > 10 ? '#2e7d32' : '#c62828',
                          fontWeight: 600
                        }}>
                          {p.stock} units
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {p.badge && (
                          <span style={{ fontSize: '0.75rem', backgroundColor: '#f5efe0', border: '1px solid #d4af37', color: '#8a6d1c', padding: '0.15rem 0.5rem', borderRadius: '100px' }}>
                            {p.badge}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button 
                            onClick={() => openEditModal(p)}
                            style={{ padding: '0.4rem', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            style={{ padding: '0.4rem', border: '1px solid #ffcdd2', borderRadius: '6px', background: '#ffebee', color: '#c62828', cursor: 'pointer' }}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management View */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontFamily: 'serif', marginBottom: '1.25rem' }}>Customer Orders</h2>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e8e4db', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2eee6', borderBottom: '1px solid #e8e4db', color: '#444' }}>
                    <th style={{ padding: '1rem' }}>Order ID</th>
                    <th style={{ padding: '1rem' }}>Customer</th>
                    <th style={{ padding: '1rem' }}>Location</th>
                    <th style={{ padding: '1rem' }}>Total (₹)</th>
                    <th style={{ padding: '1rem' }}>Payment</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f0eae1' }}>
                      <td style={{ padding: '1rem', fontWeight: 700, color: '#2d3829' }}>{o.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#666' }}>{o.phone || o.email}</div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.82rem', color: '#555' }}>
                        {o.city}, {o.state} ({o.pincode})
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>₹{o.total}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', backgroundColor: '#f0f4f8', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '100px',
                          backgroundColor: o.orderStatus === 'Delivered' ? '#e8f5e9' : o.orderStatus === 'Dispatched' ? '#e3f2fd' : '#fff8e1',
                          color: o.orderStatus === 'Delivered' ? '#2e7d32' : o.orderStatus === 'Dispatched' ? '#1565c0' : '#f57f17'
                        }}>
                          {o.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <select 
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.82rem', background: '#fff', cursor: 'pointer' }}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'serif', marginBottom: '1.25rem', color: '#2d3829' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Product Title</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. AVORA Nourishing Shampoo" 
                  required 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Subtitle / Short Tagline</label>
                <input 
                  type="text" 
                  value={formData.subtitle} 
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Cold-Pressed Jojoba & Aloe Vera" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Category</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fff' }}
                  >
                    <option value="Personal Care">Personal Care</option>
                    <option value="Food & Nutrition">Food & Nutrition</option>
                    <option value="Mother & Baby">Mother & Baby</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Badge Tag</label>
                  <input 
                    type="text" 
                    value={formData.badge} 
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Bestseller, 20% OFF" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1499" 
                    required 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>MRP / Original Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.originalPrice} 
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="1799" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Stock Count</label>
                  <input 
                    type="number" 
                    value={formData.stock} 
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="50" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Product Image</label>
                
                {/* File Upload Button */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <label style={{
                    backgroundColor: '#2d3829',
                    color: '#ffffff',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}>
                    📁 Choose Image from Device
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, image: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>or enter image path below</span>
                </div>

                {/* Live Image Preview */}
                {formData.image && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.6rem',
                    backgroundColor: '#f8f6f0',
                    borderRadius: '8px',
                    border: '1px solid #e5e0d8',
                    marginBottom: '0.8rem'
                  }}>
                    <img 
                      src={formData.image} 
                      alt="Selected preview" 
                      style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover', border: '1px solid #ccc' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2d3829' }}>Image Selected & Ready</div>
                      <div style={{ fontSize: '0.75rem', color: '#777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {formData.image.startsWith('data:') ? 'Custom file from device' : formData.image}
                      </div>
                    </div>
                  </div>
                )}

                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/assets/hero_shampoo_bottle.jpg or image URL" 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Description</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product story and key clean botanical benefits..." 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowProductModal(false)}
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#2d3829', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
