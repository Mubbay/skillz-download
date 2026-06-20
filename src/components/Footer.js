import Link from 'next/link';
import { Download } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Logo Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span style={{ color: 'var(--primary-500)', display: 'flex' }}>
                <Download size={28} strokeWidth={3} />
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.6rem', color: 'white', letterSpacing: '1px', lineHeight: '1' }}>
                SKILLZ<br/>DOWNLOAD
              </span>
            </div>
            <p className="footer-tagline">Downloaded. Not Streamed.</p>
          </div>

          {/* Tools Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Tools</h4>
            <div className="footer-links">
              <Link href="/youtube-downloader">YouTube Downloader</Link>
              <Link href="/tiktok-downloader">TikTok Downloader</Link>
              <Link href="/facebook-downloader">Facebook Downloader</Link>
              <Link href="/twitter-downloader">X (Twitter) Downloader</Link>
              <Link href="/instagram-downloader">Instagram Downloader</Link>
              <Link href="/vimeo-downloader">Vimeo Downloader</Link>
            </div>
          </div>

          {/* Capabilities Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Capabilities</h4>
            <div className="footer-links">
              <span>4K Video Downloads</span>
              <span>MP3 Audio Extraction</span>
              <span>Bulk Channel DL</span>
              <span>Subtitle Parsing</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact &amp; Support</h4>
            <div className="footer-links">
              <a href="mailto:hello@skillzdownload.com" style={{ color: 'var(--primary-500)' }}>hello@skillzdownload.com</a>
              <span>Global Servers | Unlimited Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <span>&copy; {currentYear} Skillz Download</span>
          <div className="footer-legal-links">
            <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms of Service</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
