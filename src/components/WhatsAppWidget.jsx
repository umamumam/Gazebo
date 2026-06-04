import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, MessageCircle } from 'lucide-react';

export default function WhatsAppWidget({ prefilledMessage, onClearPrefill }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Selamat datang di Sae Gazebo. Saya Rian dari Layanan Konsumen Sae Gazebo. Ada yang bisa kami bantu hari ini? 🌿',
      sender: 'received',
      time: 'Baru saja'
    }
  ]);
  const chatBodyRef = useRef(null);

  // If there's a prefilled message from configurator or actions, open widget and load it
  useEffect(() => {
    if (prefilledMessage) {
      setIsOpen(true);
      setInputValue(prefilledMessage);
      onClearPrefill(); // Clear it in parent so it doesn't trigger repeatedly
    }
  }, [prefilledMessage]);

  // Scroll to bottom on message updates
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    
    // Add user message
    const newUserMsg = {
      id: Date.now(),
      text: userMsg,
      sender: 'sent',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Trigger redirection to WhatsApp
    setTimeout(() => {
      const encoded = encodeURIComponent(userMsg);
      const url = `https://wa.me/6281234567890?text=${encoded}`;
      window.open(url, '_blank');
    }, 800);

    // Mock automatic support reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Terima kasih atas pesan Anda! Kami akan segera mengalihkan Anda ke WhatsApp chat admin resmi kami (+62 812-3456-7890) untuk konsultasi detail.',
          sender: 'received',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1800);
  };

  const handleQuickQuestion = (questionText) => {
    setInputValue(questionText);
  };

  return (
    <div className="wa-widget-container">
      {/* Chat Window */}
      {isOpen && (
        <div className="wa-chat-window">
          {/* Header */}
          <div className="wa-chat-header">
            <div className="wa-avatar">SG</div>
            <div className="wa-user-details">
              <div className="wa-user-name" style={{ color: '#fff' }}>Sae Gazebo Admin</div>
              <div className="wa-user-status">
                <span className="wa-status-dot"></span>
                Online & Siap Bantu
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ marginLeft: 'auto', color: '#94a3b8' }}
              title="Tutup Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="wa-chat-body" ref={chatBodyRef}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`wa-message ${msg.sender === 'sent' ? 'wa-message-sent' : 'wa-message-received'}`}
              >
                {msg.text.split('\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: i < msg.text.split('\n').length - 1 ? '4px' : '0' }}>{para}</p>
                ))}
                <span style={{ fontSize: '0.65rem', color: msg.sender === 'sent' ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Questions suggestion */}
          {messages.length === 1 && (
            <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              <button
                className="badge badge-primary"
                onClick={() => handleQuickQuestion('Berapa lama estimasi pembuatan gazebo kayu jati?')}
                style={{ cursor: 'pointer', fontSize: '0.7rem' }}
              >
                Tanya Durasi Pengerjaan
              </button>
              <button
                className="badge badge-primary"
                onClick={() => handleQuickQuestion('Apakah melayani pengiriman ke luar kota Jepara?')}
                style={{ cursor: 'pointer', fontSize: '0.7rem' }}
              >
                Tanya Ongkir Luar Kota
              </button>
            </div>
          )}

          {/* Footer Input */}
          <form onSubmit={handleSend} className="wa-chat-footer">
            <input
              type="text"
              className="form-control"
              placeholder="Tulis pesan Anda..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ padding: '10px 14px', fontSize: '0.85rem' }}
            />
            <button type="submit" className="wa-send-btn">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button className="wa-trigger-btn" onClick={() => setIsOpen(!isOpen)} title="Hubungi Kami via WhatsApp">
        {isOpen ? <X size={26} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
