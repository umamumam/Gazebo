import React, { useState } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, Eye, X, Check } from 'lucide-react';

const CATALOG_PRODUCTS = [
  {
    id: 'p1',
    name: 'Gazebo Teak Minimalist',
    category: 'modern',
    categoryName: 'Modern',
    price: 24500000,
    image: '/images/gazebo_modern.png',
    description: 'Gazebo dengan desain kubus minimalis tanpa ukiran rumit, sangat cocok untuk rumah modern masa kini. Menggunakan material kayu jati Grade A dan atap sirap kayu ulin yang sangat kuat dan presisi terhadap cuaca ekstrem.',
    specs: {
      'Bahan Utama': 'Kayu Jati Grade A',
      'Material Atap': 'Sirap Kayu Ulin Kalimantan',
      'Dimensi': '3 x 3 Meter (Standar)',
      'Garansi': '3 Tahun Garansi Kebocoran & Struktur',
      'Fitur Utama': 'Tahan Rayap, Finishing Doff Waterproof, Dudukan Nyaman'
    }
  },
  {
    id: 'p2',
    name: 'Gazebo Jati Klasik Jepara',
    category: 'klasik',
    categoryName: 'Klasik',
    price: 28000000,
    image: '/images/gazebo_classic.png',
    description: 'Desain segi delapan mewah dengan sentuhan ukir artistik Jepara pada pilar utama dan pembatas pagar sekeliling. Sangat anggun menghias pekarangan rumah berdesain klasik atau etnik jawa.',
    specs: {
      'Bahan Utama': 'Kayu Jati Perhutani Pilihan',
      'Material Atap': 'Genteng Tanah Liat Press Jepara',
      'Dimensi': '3 x 3 Meter',
      'Garansi': '2 Tahun Garansi Konstruksi',
      'Fitur Utama': 'Detail Ukiran Tangan, Finishing Melamine Natural Gloss, Atap Sejuk'
    }
  },
  {
    id: 'p3',
    name: 'Saung Bambu Petung Bali',
    category: 'bambu',
    categoryName: 'Bambu',
    price: 11500000,
    image: '/images/gazebo_bamboo.png',
    description: 'Saung gazebo bernuansa eksotis tropis khas resort Bali. Dibangun dari material bambu petung raksasa pilihan yang sudah melalui proses perendaman pengawetan anti-kumbang bubuk dan rayap.',
    specs: {
      'Bahan Utama': 'Bambu Petung Tua Diawetkan',
      'Material Atap': 'Alang-alang Tebal Berlapis',
      'Dimensi': '2 x 2 Meter (Lesehan)',
      'Garansi': '1 Tahun Garansi Rayap',
      'Fitur Utama': 'Sangat Sejuk, Desain Panggung Santai, Pengikat Tali Ijuk Kuat'
    }
  },
  {
    id: 'p4',
    name: 'Gazebo Modern Glass Patio',
    category: 'modern',
    categoryName: 'Modern',
    price: 38000000,
    image: '/images/gazebo_modern.png',
    description: 'Gazebo bergaya kontemporer dengan penambahan sekat dinding kaca tempered tebal di sisi belakang dan samping untuk melindungi dari hembusan angin dingin malam hari. Sempurna dipadukan dengan dek kolam renang.',
    specs: {
      'Bahan Utama': 'Kayu Jati Oven & Besi Matte Black',
      'Material Atap': 'Sirap Kayu Ulin Premium',
      'Dimensi': '4 x 4 Meter (Sangat Luas)',
      'Garansi': '3 Tahun Garansi Kebocoran',
      'Fitur Utama': 'Dinding Kaca Tempered, Hidden LED Warm Light, Panel Stop Kontak'
    }
  },
  {
    id: 'p5',
    name: 'Gazebo Kayu Kelapa Paviliun',
    category: 'klasik',
    categoryName: 'Klasik',
    price: 18500000,
    image: '/images/gazebo_classic.png',
    description: 'Terbuat dari batang pohon kelapa (kayu glugu) Sulawesi tua yang memiliki kekerasan luar biasa dan serat kayu memanjang yang khas dan artistik. Struktur kokoh dan berumur panjang.',
    specs: {
      'Bahan Utama': 'Kayu Glugu Sulawesi Pilihan',
      'Material Atap': 'Genteng Press Keramik',
      'Dimensi': '2.5 x 2.5 Meter',
      'Garansi': '2 Tahun Garansi Struktur',
      'Fitur Utama': 'Serat Kayu Glugu Eksotis, Tiang Silinder Kokoh, Mur Baut Kuat'
    }
  },
  {
    id: 'p6',
    name: 'Gazebo Bambu Atap Ijuk',
    category: 'bambu',
    categoryName: 'Bambu',
    price: 13000000,
    image: '/images/gazebo_bamboo.png',
    description: 'Gazebo bambu dengan ketahanan atap ekstra dari serat ijuk kelapa sawit alami. Serat ijuk terkenal memiliki keawetan hingga belasan tahun tanpa lapuk, sangat sejuk di siang hari dan hangat di malam hari.',
    specs: {
      'Bahan Utama': 'Bambu Wulung & Petung Tua',
      'Material Atap': 'Ijuk Tebal Alami Karpet',
      'Dimensi': '2 x 3 Meter',
      'Garansi': '1 Tahun Garansi Rayap',
      'Fitur Utama': 'Atap Anti Lapuk Belasan Tahun, Kursi Sandar Terintegrasi, Dudukan Empuk'
    }
  }
];

export default function GazeboCatalog({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null); // For Details Modal
  const [addedProductIds, setAddedProductIds] = useState({});

  const categories = [
    { id: 'all', name: 'Semua Gazebo' },
    { id: 'modern', name: 'Gaya Modern' },
    { id: 'klasik', name: 'Gaya Klasik' },
    { id: 'bambu', name: 'Bahan Bambu' },
  ];

  // Filtering
  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      specs: {
        'Bahan': product.specs['Bahan Utama'],
        'Atap': product.specs['Material Atap'],
        'Ukuran': product.specs['Dimensi']
      },
      quantity: 1,
      isCustom: false
    };
    onAddToCart(cartItem);

    // Feedback added
    setAddedProductIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section className="catalog-page" id="catalog">
      <div className="container">
        
        {/* Catalog Header */}
        <div className="catalog-header">
          <h1>Katalog Gazebo Sae</h1>
          <p>Temukan koleksi model gazebo premium siap rakit terbaik kami dengan pengerjaan detail kualitas ekspor.</p>
        </div>

        {/* Controls: Search and Tabs */}
        <div className="catalog-controls">
          {/* Search Box */}
          <div className="catalog-search">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              placeholder="Cari gazebo impian..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="catalog-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`catalog-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-panel product-card animate-fade-in">
                <div className="product-img-box">
                  <img src={product.image} alt={product.name} />
                  <span className="badge badge-primary" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    {product.categoryName}
                  </span>
                </div>

                <div className="product-card-body">
                  <h3>{product.name}</h3>
                  <p>{product.description.substring(0, 95)}...</p>
                  
                  <div className="product-specs-list">
                    <span>{product.specs['Dimensi']}</span>
                    <span>{product.specs['Bahan Utama'].split(' ')[0]}</span>
                    <span>{product.specs['Material Atap'].split(' ')[0]}</span>
                  </div>
                </div>

                <div className="product-card-footer">
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Mulai Dari</span>
                    <span className="product-price">{formatPrice(product.price)}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="nav-action-btn"
                      onClick={() => setSelectedProduct(product)}
                      title="Lihat Detail Spesifikasi"
                    >
                      <Eye size={16} />
                    </button>
                    
                    <button
                      className="btn btn-primary"
                      style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedProductIds[product.id] ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> Terpilih
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ShoppingCart size={14} /> Pesan
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            <p style={{ fontSize: '1.1rem' }}>Gazebo yang Anda cari tidak ditemukan.</p>
            <button className="btn btn-outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} style={{ marginTop: '16px' }}>
              Reset Filter & Pencarian
            </button>
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="modal-content product-detail-layout" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>
                <X size={16} />
              </button>

              <div className="detail-img-box">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>

              <div className="detail-info">
                <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
                  {selectedProduct.categoryName}
                </span>
                <h2>{selectedProduct.name}</h2>
                <p className="detail-desc">{selectedProduct.description}</p>

                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
                  Spesifikasi Lengkap:
                </h4>
                
                <div className="detail-specs-grid">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="detail-spec-item">
                      <label>{key}</label>
                      <span>{val}</span>
                    </div>
                  ))}
                </div>

                <div className="detail-footer">
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Harga Terpasang</span>
                    <span className="product-price" style={{ fontSize: '1.5rem' }}>{formatPrice(selectedProduct.price)}</span>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
                  >
                    <ShoppingCart size={18} />
                    Masukkan ke Keranjang
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
