import React, { useState } from "react";
import { Send, Mail } from "lucide-react";

export default function Footer({ setView }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Footer Top: Subscription Card */}
        <div className="footer-newsletter-card reveal">
          <div className="newsletter-content text-left">
            <h3 className="d-flex align-items-center" style={{ gap: "10px", color: "#ffffff" }}>
              <Mail
                size={24}
                style={{ color: "var(--color-secondary)" }}
              />
              Subscribe to Newsletter
            </h3>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", marginTop: "8px", marginBottom: "24px" }}>
              Dapatkan update katalog terbaru, diskon musiman, dan tips
              perawatan gazebo kayu dari ahlinya.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                className="form-control"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "12px" }}>
                <Send size={18} />
              </button>
            </form>
            {subscribed && (
              <p
                style={{
                  color: "var(--color-secondary)",
                  fontSize: "0.85rem",
                  marginTop: "8px",
                  textAlign: "left",
                  fontWeight: "600"
                }}>
                ✓ Berhasil berlangganan! Terima kasih.
              </p>
            )}
          </div>

          <div className="newsletter-visual">
            <img 
              src="/images/herobackgounrd.png" 
              alt="Sae Gazebo Premium" 
              className="newsletter-gazebo-img animate-float"
            />
          </div>
        </div>

        {/* Footer Grid Links */}
        <div className="footer-grid">
          <div className="footer-brand" style={{ textAlign: "left" }}>
            <h4>
              <span>Sae</span>Gazebo
            </h4>
            <p>
              Sae Gazebo adalah produsen gazebo kayu jati dan bambu berkualitas
              premium dengan pengerjaan tangan halus dan desain modern untuk
              mempercantik taman Anda.
            </p>
            <div className="social-links">
              <a href="#" className="social-btn" title="Facebook">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="social-btn" title="Twitter">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="social-btn" title="Instagram">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-btn" title="LinkedIn">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col" style={{ textAlign: "left" }}>
            <h5>Kategori</h5>
            <ul className="footer-link-list">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("catalog");
                  }}>
                  Gazebo Modern
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("catalog");
                  }}>
                  Gazebo Klasik
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("catalog");
                  }}>
                  Gazebo Bambu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("catalog");
                  }}>
                  Custom Gazebo
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links-col" style={{ textAlign: "left" }}>
            <h5>Perusahaan</h5>
            <ul className="footer-link-list">
              <li>
                <a href="#">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Portofolio</a>
              </li>
              <li>
                <a href="#">Hubungi Kami</a>
              </li>
              <li>
                <a href="#">Karir</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-col" style={{ textAlign: "left" }}>
            <h5>Bantuan</h5>
            <ul className="footer-link-list">
              <li>
                <a href="#">FAQ Perawatan</a>
              </li>
              <li>
                <a href="#">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="#">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="#">Pengiriman & Perakitan</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-col" style={{ textAlign: "left" }}>
            <h5>Kontak</h5>
            <ul className="footer-link-list">
              <li
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9rem",
                }}>
                Jl. Raya Gazebo No. 45, Jepara, Indonesia
              </li>
              <li
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9rem",
                }}>
                info@saegazebo.com
              </li>
              <li
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.9rem",
                }}>
                +62 812-3456-7890
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Sae Gazebo. Hak Cipta Dilindungi
            Undang-Undang.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Syarat Penggunaan</a>
            <a href="#">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
