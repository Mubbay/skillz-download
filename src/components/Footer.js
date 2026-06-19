import Link from 'next/link';
import { Download, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#111111', color: 'var(--gray-400)', paddingTop: '60px', borderTop: '1px solid var(--gray-800)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 2px 2.5fr', gap: '40px', paddingBottom: '60px' }}>
        
        {/* Left Col - Logo and Badge */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--primary-500)', display: 'flex' }}>
              <Download size={28} strokeWidth={3} />
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.8rem', color: 'white', letterSpacing: '1px', lineHeight: '1' }}>
              SKILLZ<br/>DOWNLOAD
            </span>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--gray-400)' }}>
            Downloaded. Not Streamed.
          </p>
        </div>

        {/* Divider */}
        <div style={{ background: 'var(--gray-800)', height: '100%' }}></div>

        {/* Right Cols - Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          <div>
            <h4 style={{ color: 'var(--primary-500)', fontSize: '1.2rem', marginBottom: '24px' }}>Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link href="/youtube-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>YouTube Downloader</Link>
              <Link href="/tiktok-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>TikTok Downloader</Link>
              <Link href="/facebook-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Facebook Downloader</Link>
              <Link href="/twitter-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>X (Twitter) Downloader</Link>
              <Link href="/instagram-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Instagram Downloader</Link>
              <Link href="/vimeo-downloader" style={{ color: 'var(--gray-400)', textDecoration: 'none' }}>Vimeo Downloader</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-500)', fontSize: '1.2rem', marginBottom: '24px' }}>Capabilities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ color: 'var(--gray-400)' }}>4K Video Downloads</span>
              <span style={{ color: 'var(--gray-400)' }}>MP3 Audio Extraction</span>
              <span style={{ color: 'var(--gray-400)' }}>Bulk Channel DL</span>
              <span style={{ color: 'var(--gray-400)' }}>Subtitle Parsing</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-500)', fontSize: '1.2rem', marginBottom: '24px' }}>Contact & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="mailto:hello@skillzdownload.com" style={{ color: 'var(--primary-500)', textDecoration: 'none' }}>hello@skillzdownload.com</a>
              <span style={{ color: 'var(--gray-400)' }}>Global Servers | Unlimited Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ background: 'var(--gray-950)', borderTop: '1px solid var(--gray-800)', padding: '24px 0', textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--gray-500)' }}>
          <span>Copyright {currentYear}</span>
          <span style={{ color: 'var(--gray-700)' }}>|</span>
          <Link href="/about-us" style={{ color: 'var(--gray-500)' }}>About Us</Link>
          <span style={{ color: 'var(--gray-700)' }}>|</span>
          <Link href="/contact-us" style={{ color: 'var(--gray-500)' }}>Contact Us</Link>
          <span style={{ color: 'var(--gray-700)' }}>|</span>
          <Link href="/privacy-policy" style={{ color: 'var(--gray-500)' }}>Privacy Policy</Link>
          <span style={{ color: 'var(--gray-700)' }}>|</span>
          <Link href="/terms-and-conditions" style={{ color: 'var(--gray-500)' }}>Terms of Service</Link>
          <span style={{ color: 'var(--gray-700)' }}>|</span>
          <Link href="/disclaimer" style={{ color: 'var(--gray-500)' }}>Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
