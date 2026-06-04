import React, { useState } from 'react';
import { ShoppingCart, User, LogOut, LayoutDashboard, Home, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar({ currentView, setView, cartItems, toggleCart, user, logout, openAuthModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (view) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="logo" onClick={() => handleNavClick('home')}>
          Sae Gazebo<span>.</span>
        </a>

        {/* Desktop Menu */}
        <nav className="nav-menu">
          <a
            href="#"
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalog')}
          >
            Catalog
          </a>
          <a
            href="#"
            className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              if (user) {
                handleNavClick('dashboard');
              } else {
                openAuthModal();
              }
            }}
          >
            Dashboard
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Cart Icon */}
          <button className="nav-action-btn" onClick={toggleCart} title="Open Cart">
            <ShoppingCart size={20} />
            {totalCartCount > 0 && <span className="cart-count">{totalCartCount}</span>}
          </button>

          {/* User Auth Info */}
          {user ? (
            <div className="user-profile-menu">
              <button className="user-avatar-btn">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'inline-block', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name}
                </span>
              </button>
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={() => handleNavClick('dashboard')}>
                  <LayoutDashboard size={16} />
                  My Dashboard
                </button>
                <button className="dropdown-item" onClick={() => { logout(); handleNavClick('home'); }}>
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button className="btn btn-outline" onClick={openAuthModal} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <User size={16} />
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button className="nav-action-btn menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'absolute',
          top: '80px',
          left: '24px',
          right: '24px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 999
        }}>
          <a
            href="#"
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
            style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}
          >
            Home
          </a>
          <a
            href="#"
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNavClick('catalog')}
            style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}
          >
            Catalog
          </a>
          <a
            href="#"
            className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              if (user) {
                handleNavClick('dashboard');
              } else {
                openAuthModal();
                setMobileMenuOpen(false);
              }
            }}
            style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}
          >
            Dashboard
          </a>
        </div>
      )}
    </header>
  );
}
