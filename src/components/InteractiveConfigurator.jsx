import React, { useState, useEffect } from 'react';
import { Settings, Info, MessageSquare, ShoppingCart, RefreshCw } from 'lucide-react';

export default function InteractiveConfigurator({ onAddToCart, onOpenWhatsAppChat }) {
  // Configuration options
  const shapes = [
    { id: 'square', name: 'Kotak (4 Sisi)', price: 0 },
    { id: 'hexagon', name: 'Segi Enam', price: 3000000 },
    { id: 'octagon', name: 'Segi Delapan', price: 5000000 },
  ];

  const materials = [
    { id: 'bamboo', name: 'Bambu Petung (Eco)', price: 0, img: '/images/gazebo_bamboo.png' },
    { id: 'mahogany', name: 'Kayu Mahoni', price: 4000000, img: '/images/gazebo_classic.png' },
    { id: 'teak', name: 'Kayu Jati Premium', price: 9000000, img: '/images/gazebo_modern.png' },
  ];

  const sizes = [
    { id: '2x2', name: '2 x 2 Meter', price: 0 },
    { id: '3x3', name: '3 x 3 Meter', price: 5000000 },
    { id: '4x4', name: '4 x 4 Meter', price: 12000000 },
  ];

  const roofs = [
    { id: 'thatch', name: 'Atap Alang-alang', price: 0 },
    { id: 'tile', name: 'Atap Genteng Tanah', price: 1500000 },
    { id: 'shingle', name: 'Atap Sirap Ulin (Kayu)', price: 3500000 },
  ];

  // Selected State
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[2]); // Default teak
  const [selectedSize, setSelectedSize] = useState(sizes[1]); // Default 3x3m
  const [selectedRoof, setSelectedRoof] = useState(roofs[2]); // Default shingle

  const [price, setPrice] = useState(12000000); // Base price

  // Update Price dynamically
  useEffect(() => {
    const basePrice = 12000000;
    const computedPrice = basePrice + selectedShape.price + selectedMaterial.price + selectedSize.price + selectedRoof.price;
    setPrice(computedPrice);
  }, [selectedShape, selectedMaterial, selectedSize, selectedRoof]);

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const getCustomSpecText = () => {
    return `Custom Gazebo (${selectedMaterial.name}, Ukuran ${selectedSize.name}, Atap ${selectedRoof.name}, Bentuk ${selectedShape.name})`;
  };

  const handleAddToCart = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Gazebo ${selectedMaterial.name}`,
      price: price,
      image: selectedMaterial.img,
      specs: {
        Bentuk: selectedShape.name,
        Bahan: selectedMaterial.name,
        Ukuran: selectedSize.name,
        Atap: selectedRoof.name
      },
      quantity: 1,
      isCustom: true
    };
    onAddToCart(customItem);
  };

  const handleWhatsAppOrder = () => {
    const text = `Halo Sae Gazebo! Saya ingin memesan Custom Gazebo dengan spesifikasi berikut:\n\n` +
      `- Bahan: ${selectedMaterial.name}\n` +
      `- Ukuran: ${selectedSize.name}\n` +
      `- Bentuk: ${selectedShape.name}\n` +
      `- Atap: ${selectedRoof.name}\n\n` +
      `Estimasi Harga: ${formatPrice(price)}\n\n` +
      `Mohon dibantu info proses pengerjaan dan pengirimannya. Terima kasih!`;
    
    onOpenWhatsAppChat(text);
  };

  return (
    <section className="configurator-section reveal" id="customize">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-accent">3D Preview Simulator</div>
          <h2>Konfigurator Gazebo Impian Anda</h2>
          <p>Atur bahan baku, ukuran, bentuk, dan atap sesuai kebutuhan taman Anda. Estimasi harga akan langsung berubah secara real-time.</p>
        </div>

        {/* Configurator Card Container */}
        <div className="glass-panel configurator-card">
          
          {/* Options Panel (Left) */}
          <div className="config-options">
            
            <div className="config-title">
              <h3 className="d-flex align-items-center" style={{ gap: '10px' }}>
                <Settings size={22} className="text-primary" style={{ color: 'var(--color-primary)' }} />
                Pilihan Kustomisasi
              </h3>
              <p>Sesuaikan struktur gazebo untuk mendapatkan harmoni taman terbaik.</p>
            </div>

            {/* Material / Wood Type Selection */}
            <div className="option-group">
              <div className="option-title">Bahan Baku Utama (Kayu / Bambu)</div>
              <div className="option-pills">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    className={`option-pill ${selectedMaterial.id === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedMaterial(m)}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="option-group">
              <div className="option-title">Ukuran Dimensi Ruang</div>
              <div className="option-pills">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    className={`option-pill ${selectedSize.id === s.id ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Shape Selection */}
            <div className="option-group">
              <div className="option-title">Bentuk Konstruksi</div>
              <div className="option-pills">
                {shapes.map((sh) => (
                  <button
                    key={sh.id}
                    className={`option-pill ${selectedShape.id === sh.id ? 'active' : ''}`}
                    onClick={() => setSelectedShape(sh)}
                  >
                    {sh.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Roof Selection */}
            <div className="option-group">
              <div className="option-title">Material Atap</div>
              <div className="option-pills">
                {roofs.map((r) => (
                  <button
                    key={r.id}
                    className={`option-pill ${selectedRoof.id === r.id ? 'active' : ''}`}
                    onClick={() => setSelectedRoof(r)}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', marginTop: '32px', border: '1px solid var(--color-border)' }}>
              <Info size={16} className="text-secondary" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                * Harga di atas merupakan estimasi awal bahan baku & perakitan standar. Belum termasuk ongkos kirim ke luar wilayah perakitan gratis.
              </span>
            </div>

          </div>

          {/* Preview Panel (Right) */}
          <div className="config-preview-panel">
            <div>
              <div className="option-title" style={{ textAlign: 'left', marginBottom: '12px' }}>Live Preview Mockup</div>
              <div className="preview-graphic">
                {/* 3D Grid label overlay */}
                <div style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '11px', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, zIndex: 3 }}>
                  • 3D Grid Mode
                </div>
                
                {/* Technical Zoom/Reset tools */}
                <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '6px', zIndex: 3 }}>
                  <button className="add-cart-circle-btn" style={{ width: '28px', height: '28px', background: 'var(--color-bg-surface-solid)', border: '1px solid var(--color-border-light)', color: 'var(--color-text-title)' }} title="Reset View">
                    <RefreshCw size={11} />
                  </button>
                  <button className="add-cart-circle-btn" style={{ width: '28px', height: '28px', background: 'var(--color-bg-surface-solid)', border: '1px solid var(--color-border-light)', color: 'var(--color-text-title)', fontSize: '10px', fontWeight: 'bold' }} title="Zoom In">
                    +
                  </button>
                  <button className="add-cart-circle-btn" style={{ width: '28px', height: '28px', background: 'var(--color-bg-surface-solid)', border: '1px solid var(--color-border-light)', color: 'var(--color-text-title)', fontSize: '12px', fontWeight: 'bold' }} title="Zoom Out">
                    -
                  </button>
                </div>

                <img src={selectedMaterial.img} alt="Gazebo Preview" className="animate-fade-in" />
                <div className="spec-indicator-overlay">
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                    {selectedSize.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="pricing-panel">
              <div className="price-label">Estimasi Total Harga</div>
              <div className="price-value">{formatPrice(price)}</div>
              
              <div className="price-specs">
                <span>{selectedMaterial.name}</span>
                <span>{selectedSize.name}</span>
                <span>{selectedShape.name}</span>
                <span>Atap {selectedRoof.name}</span>
              </div>

              <div className="config-actions">
                <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: '100%' }}>
                  <ShoppingCart size={18} />
                  Masukkan ke Keranjang
                </button>
                <button className="btn btn-secondary" onClick={handleWhatsAppOrder} style={{ width: '100%' }}>
                  <MessageSquare size={18} />
                  Tanya Seller via WA
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
