import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, Send } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckoutSuccess }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(false); // true to show shipping form

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 0 : 0; // Free delivery simulation or flat
  const total = subtotal + deliveryFee;

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    // Compile items list
    let itemsText = '';
    cartItems.forEach((item, index) => {
      itemsText += `${index + 1}. ${item.name} (${item.quantity}x)\n`;
      if (item.specs) {
        Object.entries(item.specs).forEach(([key, val]) => {
          itemsText += `   - ${key}: ${val}\n`;
        });
      }
      itemsText += `   Harga Satuan: ${formatPrice(item.price)}\n\n`;
    });

    const fullMessage = `Halo Sae Gazebo! Saya ingin melakukan pembelian gazebo dengan rincian berikut:\n\n` +
      `*Daftar Pesanan:*\n${itemsText}` +
      `*Total Pembayaran:* ${formatPrice(total)}\n\n` +
      `*Detail Penerima:*\n` +
      `- Nama: ${name}\n` +
      `- Alamat Pengiriman: ${address}\n` +
      `- Catatan Tambahan: ${notes || '-'}\n\n` +
      `Mohon diinformasikan metode pembayaran dan jadwal perakitannya. Terima kasih!`;

    // Open WhatsApp link
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Callback to save order to dashboard
    const orderRecord = {
      id: `SG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      items: cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        specs: item.specs
      })),
      total: total,
      status: 'Pending',
      shippingAddress: address
    };

    onCheckoutSuccess(orderRecord);
    
    // Clear inputs and close
    setName('');
    setAddress('');
    setNotes('');
    setCheckoutStep(false);
    onClose();
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        
        {/* Header */}
        <div className="cart-header">
          <h3>
            <ShoppingCart size={20} className="text-primary" />
            Keranjang Belanja
          </h3>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Items Container */}
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                  
                  {item.specs && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      {Object.entries(item.specs).map(([key, val]) => (
                        <span key={key} style={{ marginRight: '8px', display: 'inline-block' }}>
                          • {key}: {val}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div className="cart-item-controls">
                    <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={10} />
                    </button>
                    <span className="quantity-val">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={10} />
                    </button>
                  </div>
                </div>

                <button className="cart-item-remove-btn" onClick={() => onRemoveItem(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              <ShoppingCart size={48} className="text-muted" style={{ strokeWidth: 1 }} />
              <div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Keranjang Anda Kosong</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  Pilih gazebo di katalog atau rancang sendiri di simulator kustomisasi.
                </p>
              </div>
            </div>
          )}

          {/* Checkout shipping address form */}
          {checkoutStep && cartItems.length > 0 && (
            <form onSubmit={handleCheckoutSubmit} className="cart-checkout-form animate-fade-in">
              <div className="option-title" style={{ marginBottom: '12px', textAlign: 'left' }}>Formulir Pengiriman</div>
              
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama penerima"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Alamat Lengkap Pengiriman</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Nama jalan, nomor rumah, kelurahan, kecamatan, kota, kode pos"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ resize: 'vertical' }}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Titik jemput seberang masjid"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-secondary checkout-btn">
                <Send size={16} />
                Kirim Pesanan ke WhatsApp
              </button>
            </form>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>Subtotal Produk</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Ongkos Kirim & Perakitan</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Gratis Wilayah Terpilih</span>
            </div>
            
            <div className="cart-summary-row total">
              <span>Total Estimasi</span>
              <span>{formatPrice(total)}</span>
            </div>

            {!checkoutStep ? (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setCheckoutStep(true)}>
                Lanjutkan Pemesanan
              </button>
            ) : (
              <button className="btn btn-outline" style={{ width: '100%', marginTop: '8px' }} onClick={() => setCheckoutStep(false)}>
                Kembali ke Keranjang
              </button>
            )}
          </div>
        )}

      </div>
    </>
  );
}
