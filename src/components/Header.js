'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-inner" style={{ padding: '0 20px' }}>
          <Link href="/" className="logo" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)', display: 'flex' }}>
              <Download size={22} strokeWidth={3} />
            </span>
            <span className="logo-text" style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>
              SKILLZ DOWNLOAD
            </span>
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
            <Link href="/" className="nav-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link href="/youtube-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              YouTube
            </Link>
            <Link href="/tiktok-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              TikTok
            </Link>
            <Link href="/facebook-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              Facebook
            </Link>
            <Link href="/twitter-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              X (Twitter)
            </Link>
            <Link href="/instagram-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              Instagram
            </Link>
            <Link href="/vimeo-downloader" className="nav-link" onClick={() => setMobileOpen(false)}>
              Vimeo
            </Link>
            <Link href="/blog" className="nav-link" onClick={() => setMobileOpen(false)}>
              Blog
            </Link>
          </nav>

          <div className="header-cta">
            <Link href="/" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '8px' }}>
              Start Downloading
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
