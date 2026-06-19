'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-inner" style={{ padding: '0 20px' }}>
          <Link href="/" className="logo" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)', display: 'flex' }}>
              <Download size={22} strokeWidth={3} />
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>
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

          <nav className={`nav ${mobileOpen ? 'open' : ''}`} style={{ flexGrow: 1, justifyContent: 'center', gap: '20px' }}>
            <Link href="/" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              Home
            </Link>
            <Link href="/youtube-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              YouTube
            </Link>
            <Link href="/tiktok-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              TikTok
            </Link>
            <Link href="/facebook-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              Facebook
            </Link>
            <Link href="/twitter-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              X (Twitter)
            </Link>
            <Link href="/instagram-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              Instagram
            </Link>
            <Link href="/vimeo-downloader" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              Vimeo
            </Link>
            <Link href="/blog" className="nav-link" onClick={() => setMobileOpen(false)} style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
              Blog
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '8px' }}>
              Start Downloading
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
