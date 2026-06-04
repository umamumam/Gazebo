import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import GazeboCatalog from './components/GazeboCatalog';
import AuthModal from './components/AuthModal';
import CartSidebar from './components/CartSidebar';
import WhatsAppWidget from './components/WhatsAppWidget';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

import { Truck, ShieldCheck, HeartHandshake, Scissors, ArrowRight, Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: 'p1',
    name: 'Gazebo Teak Minimalist',
    price: 24500000,
    image: '/images/gazebo_modern.png',
    desc: 'Bahan kayu jati Grade A, atap sirap kayu ulin kalimantan.',
  },
  {
    id: 'p2',
    name: 'Gazebo Jati Klasik Jepara',
    price: 28000000,
    image: '/images/gazebo_classic.png',
    desc: 'Detail ukiran tangan khas Jepara, atap genteng tanah liat press.',
  },
  {
    id: 'p3',
    name: 'Saung Bambu Petung Bali',
    price: 11500000,
    image: '/images/gazebo_bamboo.png',
    desc: 'Material bambu petung diawetkan, atap alang-alang tropis.',
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Pengerjaan rapi sekali! Tim perakit dari Jepara datang tepat waktu dan merakit gazebo jati di halaman kami hanya dalam satu hari. Kualitas kayunya sangat solid dan tebal. Sangat direkomendasikan!",
    author: "Siti Rahmawati",
    role: "Pemilik Vila, Ubud Bali",
    image: "/images/person_1.jpg"
  },
  {
    id: 2,
    quote: "Kami memesan gazebo modern glass patio untuk taman belakang kantor. Desain minimalisnya sangat klop dengan arsitektur kantor kami. Kaca tempered-nya memberikan kesan mewah luar biasa.",
    author: "Hendri Susanto",
    role: "CEO Tech Ventures, Jakarta",
    image: "/images/person_2.jpg"
  },
  {
    id: 3,
    quote: "Saung bambunya sejuk sekali untuk tempat nongkrong sore bersama keluarga. Harganya sangat terjangkau dibanding toko furniture lokal di kota kami. Pemasangan cepat dan pasaknya presisi.",
    author: "Dr. Budi Utomo",
    role: "Pemilik Rumah Pribadi, Semarang",
    image: "/images/person_3.jpg"
  }
];

const FAQ_ITEMS = [
  {
    q: "Apakah harga yang tertera sudah termasuk biaya pengiriman dan pemasangan?",
    a: "Ya! Untuk seluruh wilayah pulau Jawa dan Bali, harga kami sudah ALL-IN, termasuk biaya pengiriman suku cadang gazebo dan jasa perakitan langsung di lokasi oleh tim tukang profesional kami."
  },
  {
    q: "Bagaimana ketahanan gazebo terhadap rayap dan cuaca ekstrem?",
    a: "Sae Gazebo menggunakan kayu jati perhutani pilihan dan bambu petung yang telah melalui proses pengawetan khusus (perendaman cairan anti-hama). Atap sirap kayu ulin kami juga terbukti tahan air hujan asam dan panas ekstrem hingga belasan tahun."
  },
  {
    q: "Apakah saya bisa memesan gazebo dengan ukuran dan model sendiri?",
    a: "Tentu saja! Anda bisa menggunakan fitur simulator 'Simulator Kustomisasi' di website kami atau menghubungi admin WhatsApp kami secara langsung untuk mendiskusikan gambar denah dan model gazebo kustom yang Anda inginkan."
  },
  {
    q: "Bagaimana sistem pembayaran pemesanan gazebo di Sae Gazebo?",
    a: "Kami mendukung sistem pembayaran yang aman dan transparan. Anda dapat membayar Down Payment (DP) sebesar 30% sebagai tanda jadi, dan sisa pelunasan 70% dibayarkan setelah gazebo selesai dirakit sempurna di halaman rumah Anda (Cash on Delivery / COD)."
  }
];

function App() {
  const [currentView, setView] = useState('home'); // 'home', 'catalog', 'dashboard'
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('saegazebo_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('saegazebo_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // User Orders State (connected to dashboard)
  const [orders, setOrders] = useState([]);

  // Pre-load default orders when user logs in
  useEffect(() => {
    if (user) {
      // Mock historical orders for user
      const mockOrders = [
        {
          id: 'SG-8192',
          date: '15 April 2026',
          items: [
            {
              name: 'Gazebo Teak Minimalist',
              qty: 1,
              price: 24500000,
              specs: { 'Bahan': 'Kayu Jati Grade A', 'Atap': 'Sirap Kayu Ulin', 'Ukuran': '3 x 3 Meter' }
            }
          ],
          total: 24500000,
          status: 'Completed',
          shippingAddress: 'Perumahan Indah Asri Blok C-12, Surabaya'
        }
      ];
      
      const storedOrders = localStorage.getItem(`saegazebo_orders_${user.email}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        localStorage.setItem(`saegazebo_orders_${user.email}`, JSON.stringify(mockOrders));
        setOrders(mockOrders);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  // Sync Cart to Local Storage
  useEffect(() => {
    localStorage.setItem('saegazebo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Scroll Reveal Intersection Observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView]);

  // WhatsApp Chat Prefill State
  const [waPrefilledMessage, setWaPrefilledMessage] = useState('');

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      // If custom item, always add as a new item to allow multiple custom configurations
      if (item.isCustom) {
        return [...prevItems, item];
      }
      
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }
      return [...prevItems, item];
    });
    // Open Cart Sidebar for feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckoutSuccess = (newOrder) => {
    if (user) {
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem(`saegazebo_orders_${user.email}`, JSON.stringify(updatedOrders));
    }
    
    // Clear cart
    setCartItems([]);
    
    // Open Dashboard to show status
    if (user) {
      setView('dashboard');
      alert(`Pesanan ${newOrder.id} berhasil diajukan! Admin kami akan menghubungi Anda di WhatsApp.`);
    } else {
      alert('Pesanan berhasil diajukan via WhatsApp! Silakan login untuk melacak status pesanan Anda di dashboard.');
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('saegazebo_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('saegazebo_user');
  };

  const handleOpenWhatsAppChat = (messageText) => {
    setWaPrefilledMessage(messageText);
  };

  // UI Testimonial Slider States
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (currentView !== 'home') return;
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [currentView]);

  // UI FAQ States
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleScrollToCustomize = () => {
    const customizeSection = document.getElementById('customize');
    if (customizeSection) {
      customizeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setView={setView}
        cartItems={cartItems}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        user={user}
        logout={handleLogout}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <div key={currentView} className="page-transition">
          {currentView === 'home' && (
            <>
              {/* Hero Section */}
              <Hero setView={setView} onOpenCustomize={handleScrollToCustomize} />

              {/* Product Feature Highlight Section (FURNI references) */}
              <section className="features-section reveal" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="container">
                <div className="features-grid">
                  {/* Column 1: Info */}
                  <div className="feature-intro-card">
                    <div className="badge badge-primary" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>Excellent Material</div>
                    <h2>Dibuat Dengan Material Unggul.</h2>
                    <p>
                      Mulai dari tiang kayu jati solid, pasak knock-down presisi, hingga atap sirap kayu ulin antibocor. Keindahan alami berumur panjang.
                    </p>
                    <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }} onClick={() => setView('catalog')}>
                      Jelajahi Model
                    </button>
                  </div>

                  {/* Columns 2-4: Showcase Items */}
                  {FEATURED_PRODUCTS.map((prod) => (
                    <div key={prod.id} className="glass-panel feature-item-card">
                      <div className="feature-img-wrapper">
                        <img src={prod.image} alt={prod.name} />
                      </div>
                      <div>
                        <h3>{prod.name}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>{prod.desc}</p>
                        
                        <div className="feature-action">
                          <div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: 'block' }}>Mulai</span>
                            <span className="feature-price">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(prod.price)}</span>
                          </div>
                          
                          <button
                            className="add-cart-circle-btn"
                            onClick={() => handleAddToCart({
                              id: prod.id,
                              name: prod.name,
                              price: prod.price,
                              image: prod.image,
                              specs: { 'Tipe': 'Standar' },
                              quantity: 1
                            })}
                            title="Tambahkan ke Keranjang"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section reveal" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)' }}>
              <div className="container why-grid">
                
                <div className="why-left">
                  <h2>Mengapa Memilih Sae Gazebo?</h2>
                  <p>Kami menjamin seluruh pengerjaan dari hulu ke hilir dengan standar kualitas terbaik demi kepuasan Anda.</p>
                  
                  <div className="why-features-grid">
                    <div className="why-feature-item">
                      <div className="why-icon-box"><Truck size={20} /></div>
                      <h3>Gratis Ongkir & Perakitan</h3>
                      <p>Kirim langsung dari bengkel Jepara kami. Perakitan dilakukan oleh tim ahli di taman Anda gratis.</p>
                    </div>

                    <div className="why-feature-item">
                      <div className="why-icon-box" style={{ color: 'var(--color-accent)', background: 'rgba(245,158,11,0.08)' }}><Scissors size={20} /></div>
                      <h3>Kustomisasi Simulator</h3>
                      <p>Rancang sendiri ukuran, bahan kayu, dan jenis atap dengan visual simulator langsung di web.</p>
                    </div>

                    <div className="why-feature-item">
                      <div className="why-icon-box" style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.08)' }}><HeartHandshake size={20} /></div>
                      <h3>Konsultasi Gratis 24/7</h3>
                      <p>Konsultasikan layout penempatan taman, luas lahan, dan dekorasi tanaman tanpa biaya.</p>
                    </div>

                    <div className="why-feature-item">
                      <div className="why-icon-box"><ShieldCheck size={20} /></div>
                      <h3>Garansi Struktur 3 Tahun</h3>
                      <p>Bebas cemas. Jaminan perbaikan gratis jika struktur kayu retak ekstrim atau bocor.</p>
                    </div>
                  </div>
                </div>

                {/* Right Image with circular design styling */}
                <div className="why-right">
                  <div className="why-img-container">
                    <img src="/images/why_choose_us_gazebo.png" alt="Sae Gazebo Workshop" />
                  </div>
                </div>

              </div>
            </section>

            {/* We Help Section */}
            <section className="we-help-section reveal" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="container help-grid">
                
                {/* Images Collage Grid */}
                <div className="help-images-grid">
                  <div className="help-img-box box-1">
                    <img src="/images/gazebo_result.png" alt="Gazebo Hasil Jadi" />
                  </div>
                  <div className="help-img-box box-2">
                    <img src="/images/gazebo_install.png" alt="Proses Pemasangan Gazebo" />
                  </div>
                  <div className="help-img-box box-3">
                    <img src="/images/gazebo_team.png" alt="Tim Pengrajin Sae Gazebo" />
                  </div>
                </div>

                {/* Right Side Info */}
                <div className="help-right">
                  <h2>Kami Membantu Menghadirkan Sudut Santai Sempurna</h2>
                  <p>
                    Taman rumah Anda layak mendapatkan pusat perhatian yang nyaman. Kami menangani seluruh siklus pemasangan gazebo impian Anda mulai dari perancangan model, pengiriman rapi, hingga perakitan cepat di halaman Anda.
                  </p>

                  <div className="help-bullets">
                    <div className="help-bullet-item">
                      <div className="bullet-dot"></div>
                      <span>Kayu Jati oven perhutani grade ekspor</span>
                    </div>
                    <div className="help-bullet-item">
                      <div className="bullet-dot"></div>
                      <span>Dikerjakan pengrajin halus ukir Jepara</span>
                    </div>
                    <div className="help-bullet-item">
                      <div className="bullet-dot"></div>
                      <span>Sistem knockdown modular pasak bambu</span>
                    </div>
                    <div className="help-bullet-item">
                      <div className="bullet-dot"></div>
                      <span>Pembayaran COD setelah rakit selesai</span>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={() => setView('catalog')}>
                    Jelajahi Semua Model Gazebo
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>
            </section>

            {/* Configurator Simulator (SaaS Dashboard Visual Element) */}
            <InteractiveConfigurator
              onAddToCart={handleAddToCart}
              onOpenWhatsAppChat={handleOpenWhatsAppChat}
            />

            {/* Testimonials Section */}
            <section className="testimonial-section reveal" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)' }}>
              <div className="container">
                <div className="section-header">
                  <div className="badge badge-primary">Testimoni Pelanggan</div>
                  <h2>Apa Kata Pemilik Sae Gazebo</h2>
                  <p>Ulasan langsung dari para pemilik vila, hotel, dan rumah pribadi di seluruh Indonesia.</p>
                </div>

                <div className="testimonial-carousel">
                  <button className="carousel-nav-btn carousel-prev" onClick={prevTestimonial}>
                    <ChevronLeft size={20} />
                  </button>
                  
                  {TESTIMONIALS.map((test, index) => (
                    <div
                      key={test.id}
                      className={`testimonial-card glass-panel ${activeTestimonialIndex === index ? 'active' : ''}`}
                      style={{ width: '100%' }}
                    >
                      <p className="testimonial-quote">“{test.quote}”</p>
                      <div className="author-block">
                        <div className="author-img">
                          <img src={test.image} alt={test.author} />
                        </div>
                        <div>
                          <div className="author-name">{test.author}</div>
                          <div className="author-role">{test.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="carousel-nav-btn carousel-next" onClick={nextTestimonial}>
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Testimonial Dots */}
                <div className="testimonial-dots">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      className={`testimonial-dot ${activeTestimonialIndex === index ? 'active' : ''}`}
                      onClick={() => setActiveTestimonialIndex(index)}
                      aria-label={`Testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="faq-section reveal" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="container">
                <div className="section-header">
                  <div className="badge badge-accent">FAQ</div>
                  <h2>Pertanyaan yang Sering Diajukan</h2>
                  <p>Dapatkan jawaban instan mengenai garansi, pengiriman, perakitan, dan kustomisasi gazebo.</p>
                </div>

                <div className="faq-list">
                  {FAQ_ITEMS.map((item, index) => (
                    <div key={index} className={`faq-item glass-panel ${activeFaqIndex === index ? 'active' : ''}`}>
                      <button className="faq-question-btn" onClick={() => toggleFaq(index)}>
                        {item.q}
                        <ChevronRight size={18} className="faq-icon-spin" />
                      </button>
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'catalog' && (
          <GazeboCatalog onAddToCart={handleAddToCart} />
        )}

        {currentView === 'dashboard' && user && (
          <Dashboard
            user={user}
            orders={orders}
            onOpenWhatsAppChat={handleOpenWhatsAppChat}
          />
        )}
        </div>
      </main>

      {/* Footer */}
      <Footer setView={setView} />

      {/* Auth Modal Popup */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Cart Sidebar Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget
        prefilledMessage={waPrefilledMessage}
        onClearPrefill={() => setWaPrefilledMessage('')}
      />
    </div>
  );
}

export default App;
