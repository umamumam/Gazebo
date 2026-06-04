import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const LINE1 = 'Bangun Sudut';
const LINE2 = 'Santai Impian Anda';
const TYPE_SPEED   = 65;    // ms per character
const PAUSE_BETWEEN = 320;  // ms pause before starting line 2
const LOOP_DELAY   = 10000; // 10 s idle before restarting

export default function Hero({ setView, onOpenCustomize }) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  // phase: 'line1' | 'line2' | 'done' | 'reset'
  const [phase, setPhase] = useState('line1');

  /* ── Type line 1 ── */
  useEffect(() => {
    if (phase !== 'line1') return;
    if (text1.length === LINE1.length) {
      const t = setTimeout(() => setPhase('line2'), PAUSE_BETWEEN);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setText1(LINE1.slice(0, text1.length + 1)), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [text1, phase]);

  /* ── Type line 2 ── */
  useEffect(() => {
    if (phase !== 'line2') return;
    if (text2.length === LINE2.length) {
      setPhase('done');
      return;
    }
    const t = setTimeout(() => setText2(LINE2.slice(0, text2.length + 1)), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [text2, phase]);

  /* ── Wait 10 s when done, then reset ── */
  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => {
      // erase line 2 first, then line 1, to create a "delete" feel before restart
      setText2('');
      setText1('');
      setPhase('line1');
    }, LOOP_DELAY);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        {/* Left: Content */}
        <div className="hero-content animate-fade-in" style={{ textAlign: 'left' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} />
            Premium Outdoor Woodcraft
          </div>

          <h1 className="hero-typewriter-heading">
            {/* Line 1 */}
            <span className="typewriter-line">
              {text1}
              {phase === 'line1' && <span className="typewriter-cursor">|</span>}
            </span>

            <br />

            {/* Line 2 */}
            <span className="typewriter-line">
              {text2}
              {phase === 'line2' && <span className="typewriter-cursor">|</span>}
              {phase === 'done' && (
                <span className="typewriter-cursor typewriter-cursor--blink typewriter-cursor--fade">|</span>
              )}
            </span>
          </h1>

          <p>
            Miliki gazebo kayu jati premium dan bambu pilihan dengan estetika tinggi, kokoh, tahan cuaca, serta dirakit langsung di halaman rumah Anda oleh tim pengrajin berpengalaman Jepara.
          </p>
          <div className="hero-cta">
            <button className="btn btn-secondary" onClick={() => setView('catalog')}>
              Lihat Katalog Gazebo
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-white-outline" onClick={onOpenCustomize}>
              Desain Sendiri (Custom)
            </button>
          </div>
        </div>

        {/* Right: Visual Showcase */}
        <div className="hero-visual">
          <div className="hero-glow"></div>
          <div className="hero-image-card animate-float">
            <img src="/images/herobackgounrd.png" alt="Sae Gazebo Premium Jati" />
          </div>
        </div>
      </div>
    </section>
  );
}
