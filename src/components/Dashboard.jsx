import React, { useState } from 'react';
import { User, ClipboardList, Shield, CreditCard, MessageSquare, PhoneCall, HelpCircle, Package } from 'lucide-react';

export default function Dashboard({ user, orders, onOpenWhatsAppChat }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'profile'

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleContactAdminOrder = (order) => {
    const text = `Halo Sae Gazebo! Saya ingin menanyakan status pesanan saya dengan nomor ID *${order.id}*.\n\n` +
      `- Tanggal: ${order.date}\n` +
      `- Total Transaksi: ${formatPrice(order.total)}\n` +
      `- Status Saat Ini: ${order.status}\n\n` +
      `Mohon dibantu info perkembangannya. Terima kasih!`;
    
    onOpenWhatsAppChat(text);
  };

  return (
    <div className="container dashboard-page">
      {/* Dashboard Header */}
      <div className="catalog-header" style={{ marginBottom: '20px' }}>
        <h1>Dashboard Pelanggan</h1>
        <p>Kelola pesanan, pengajuan kustomisasi gazebo, dan status garansi aktif Anda.</p>
      </div>

      <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className="glass-panel dashboard-sidebar">
          {/* User Profile Card */}
          <div className="dashboard-user-card">
            <div className="user-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="dashboard-user-info">
              <h4>{user.name}</h4>
              <p>{user.role || 'Pelanggan Gold'}</p>
            </div>
          </div>

          {/* Menu Options */}
          <nav className="dashboard-menu-list">
            <button
              className={`dashboard-menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ClipboardList size={18} />
              Daftar Pesanan & Kustom
            </button>
            <button
              className={`dashboard-menu-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              Informasi Profil
            </button>
          </nav>

          {/* Need help box */}
          <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid var(--color-border)', marginTop: '20px' }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <HelpCircle size={14} className="text-primary" /> Butuh Bantuan?
            </h5>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
              Hubungi tim support kami jika Anda menemui kendala pengiriman atau pemasangan gazebo.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => onOpenWhatsAppChat('Halo tim support Sae Gazebo! Saya memerlukan bantuan teknis mengenai pemasangan gazebo.')}
              style={{ width: '100%', padding: '6px 12px', fontSize: '0.75rem' }}
            >
              Hubungi CS Support
            </button>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="dashboard-content">
          {activeTab === 'orders' ? (
            <div>
              {/* Header block */}
              <div className="dashboard-header-block">
                <h2>Pesanan & Pengajuan</h2>
                <p>Status pengerjaan pesanan gazebo siap pasang dan simulasi kustomisasi Anda.</p>
              </div>

              {/* Stats Metrics Cards */}
              <div className="dashboard-stats-grid">
                <div className="glass-panel dashboard-stat-card">
                  <div className="stat-icon"><Package size={20} /></div>
                  <div className="stat-value">{orders.length}</div>
                  <div className="stat-label">Total Pesanan</div>
                </div>

                <div className="glass-panel dashboard-stat-card">
                  <div className="stat-icon" style={{ color: 'var(--color-accent)', background: 'rgba(245,158,11,0.08)' }}>
                    <Shield size={20} />
                  </div>
                  <div className="stat-value">3 Tahun</div>
                  <div className="stat-label">Garansi Aktif</div>
                </div>

                <div className="glass-panel dashboard-stat-card">
                  <div className="stat-icon" style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.08)' }}>
                    <CreditCard size={20} />
                  </div>
                  <div className="stat-value">Lunas</div>
                  <div className="stat-label">Status Tagihan</div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="glass-panel dashboard-table-card">
                <div className="option-title" style={{ marginBottom: '16px' }}>Riwayat Pengerjaan & Pembelian</div>
                
                {orders.length > 0 ? (
                  <div className="table-wrapper">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>ID Pesanan</th>
                          <th>Tanggal</th>
                          <th>Item Gazebo</th>
                          <th>Alamat Penerima</th>
                          <th>Total Harga</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <span className="order-id">{order.id}</span>
                            </td>
                            <td>{order.date}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>
                                {order.items.map((it, i) => (
                                  <div key={i}>
                                    {it.name} <span style={{ color: 'var(--color-primary)' }}>x{it.qty}</span>
                                    {it.specs && (
                                      <div className="order-spec">
                                        {Object.entries(it.specs).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                {order.shippingAddress}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontWeight: 700 }}>{formatPrice(order.total)}</span>
                            </td>
                            <td>
                              <span className={`status-badge ${
                                order.status === 'Completed' ? 'status-completed' : 
                                order.status === 'Processing' ? 'status-processing' : 'status-pending'
                              }`}>
                                {order.status === 'Pending' && 'Antrean'}
                                {order.status === 'Processing' && 'Pengerjaan'}
                                {order.status === 'Completed' && 'Terpasang'}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-outline"
                                onClick={() => handleContactAdminOrder(order)}
                                style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                              >
                                <MessageSquare size={12} />
                                Hubungi Admin
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                    Tidak ada pesanan aktif.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Profile view */}
              <div className="dashboard-header-block">
                <h2>Informasi Profil Pelanggan</h2>
                <p>Data pribadi Anda yang terdaftar pada sistem penjualan Sae Gazebo.</p>
              </div>

              <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Nama Lengkap</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.name}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Alamat Email</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.email}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Nomor Telepon/WhatsApp</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.phone || '-'}</p>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Status Akun</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>{user.role || 'Pelanggan Gold'}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Terdaftar Sejak</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{user.createdAt || '04 Juni 2026'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
