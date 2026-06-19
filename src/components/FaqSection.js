'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function FaqSection({ faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="section" style={{ padding: '120px 24px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'flex-start' }}>
        
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '15rem', fontWeight: 800, color: 'var(--gray-900)', position: 'absolute', top: '-100px', left: '-40px', zIndex: 0, userSelect: 'none' }}>?</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ color: 'var(--primary-500)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>FAQ</span>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '16px', lineHeight: 1.1, color: 'white' }}>Any questions?</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.2rem', marginBottom: '40px' }}>If it's not here, email us.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '0.9rem', borderRadius: '4px', letterSpacing: '1px' }}>
              START DOWNLOADING <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div style={{ border: '1px solid var(--gray-800)', borderRadius: '8px', background: '#111111', overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i !== faqs.length - 1 ? '1px solid var(--gray-800)' : 'none' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                {faq.q}
                <span style={{ fontSize: '1.5rem', color: 'var(--gray-400)', fontWeight: 300 }}>{openFaq === i ? '×' : '+'}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 24px', color: 'var(--gray-400)', lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
