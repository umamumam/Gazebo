import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Key, ShieldCheck } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Alert logs
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginDemo = () => {
    // Fill in demo values
    setEmail('user@saegazebo.com');
    setPassword('123456');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (activeTab === 'login') {
      // Mock validation
      if (email === 'user@saegazebo.com' && password === '123456') {
        const dummyUser = {
          name: 'Budiono Siregar',
          email: 'user@saegazebo.com',
          phone: '+62 812-9988-7766',
          role: 'Customer',
          createdAt: '04 Juni 2026'
        };
        setSuccessMsg('Login berhasil! Mengalihkan...');
        setTimeout(() => {
          onLoginSuccess(dummyUser);
          onClose();
        }, 1200);
      } else if (!email.trim() || !password.trim()) {
        setErrorMsg('Harap isi semua kolom.');
      } else {
        setErrorMsg('Email atau password salah. Coba akun demo.');
      }
    } else if (activeTab === 'register') {
      if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
        setErrorMsg('Harap isi semua kolom pendaftaran.');
        return;
      }
      
      const newUser = {
        name: name,
        email: email,
        phone: phone,
        role: 'Customer',
        createdAt: '04 Juni 2026'
      };

      setSuccessMsg('Pendaftaran berhasil! Akun Anda siap digunakan.');
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 1500);
    } else if (activeTab === 'forgot') {
      if (!email.trim()) {
        setErrorMsg('Harap masukkan email Anda.');
        return;
      }
      setSuccessMsg(`Tautan reset sandi telah dikirim ke ${email}. Harap periksa folder kotak masuk Anda.`);
      setTimeout(() => {
        setActiveTab('login');
        setErrorMsg('');
        setSuccessMsg('');
      }, 4000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* Tab Headers (only if not in forgot password mode) */}
        {activeTab !== 'forgot' ? (
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="auth-tabs">
            <button className="auth-tab active" style={{ flex: 1 }}>Reset Password</button>
          </div>
        )}

        <div className="auth-body">
          {/* Form Header Info */}
          <div className="auth-header">
            <h3>
              {activeTab === 'login' && 'Selamat Datang Kembali'}
              {activeTab === 'register' && 'Buat Akun Baru'}
              {activeTab === 'forgot' && 'Lupa Password Anda?'}
            </h3>
            <p>
              {activeTab === 'login' && 'Masuk untuk mengelola pesanan & kustomisasi gazebo Anda.'}
              {activeTab === 'register' && 'Daftar sekarang untuk melacak pesanan dan konsultasi custom.'}
              {activeTab === 'forgot' && 'Masukkan email terdaftar Anda untuk mengirim link reset.'}
            </p>
          </div>

          {/* Feedback alerts */}
          {errorMsg && <div className="auth-alert auth-alert-danger">{errorMsg}</div>}
          {successMsg && <div className="auth-alert auth-alert-success">{successMsg}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Input (Register Only) */}
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Budiono Siregar"
                    style={{ paddingLeft: '44px' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Input (All) */}
            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Contoh: email@anda.com"
                  style={{ paddingLeft: '44px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Input (Register Only) */}
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">Nomor WhatsApp</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Contoh: 081234567890"
                    style={{ paddingLeft: '44px' }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Input (Login/Register) */}
            {activeTab !== 'forgot' && (
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ margin: 0 }}>Password</label>
                  {activeTab === 'login' && (
                    <a
                      href="#"
                      className="auth-switch-btn"
                      style={{ fontSize: '0.8rem' }}
                      onClick={(e) => { e.preventDefault(); setActiveTab('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    >
                      Lupa Password?
                    </a>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Masukkan password Anda"
                    style={{ paddingLeft: '44px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary auth-action-btn">
              {activeTab === 'login' && 'Masuk ke Akun'}
              {activeTab === 'register' && 'Daftar Akun Baru'}
              {activeTab === 'forgot' && 'Kirim Link Reset'}
            </button>

            {/* Demo Account Prompt (Login Only) */}
            {activeTab === 'login' && (
              <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'left' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                  <ShieldCheck size={14} /> Preset Akun Demo Penawaran:
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  Gunakan data akun uji coba di bawah untuk akses langsung tanpa mendaftar.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleLoginDemo}
                  style={{ width: '100%', padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                >
                  Gunakan Akun Uji Coba (Auto-fill)
                </button>
              </div>
            )}

            {/* Switch Mode Footer */}
            {activeTab === 'forgot' && (
              <div className="auth-switch">
                Kembali ke halaman{' '}
                <a
                  href="#"
                  className="auth-switch-btn"
                  onClick={(e) => { e.preventDefault(); setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                >
                  Sign In
                </a>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
