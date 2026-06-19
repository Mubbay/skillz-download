import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadForm from '@/components/DownloadForm';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Instagram Video Downloader - Fast & Free | Skillz Download',
  description: 'Download Instagram videos, Reels, and stories quickly and easily in HD for free. Fast, secure, and requires no software installation.',
};

export default function InstagramDownloaderPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      
      <main className="flex-grow text-white">
        {/* Hero Section */}
        <section className="hero" style={{ 
          padding: '120px 24px 100px', 
          backgroundImage: 'linear-gradient(rgba(15, 17, 21, 0.85), rgba(15, 17, 21, 0.95)), url("/img/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <div className="animate-fade-in-up">
            <span className="hero-badge" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderColor: 'var(--gray-800)', color: 'var(--primary-500)' }}>
              <img src="/img/instagram-svgrepo-com.svg" alt="Instagram Logo" width="16" height="16" />
              Free Instagram Downloader
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-1" style={{ maxWidth: '900px', margin: '0 auto 24px', fontWeight: 800, color: 'white' }}>
            Download <span style={{ color: 'var(--primary-500)' }}>Instagram Videos</span><br/>Instantly.
          </h1>

          <p className="animate-fade-in-up delay-2" style={{ maxWidth: '600px', margin: '0 auto 48px', fontSize: '1.2rem', color: 'var(--gray-300)' }}>
            The fastest way to save your favorite Instagram Reels and stories in HD quality. No registration, no limits, completely free.
          </p>

          <DownloadForm platformName="Instagram" placeholder="Paste your Instagram video URL here..." />
        </section>

        {/* Disclaimer Banner */}
        <div style={{ background: '#111111', borderBottom: '1px solid var(--gray-800)', padding: '16px 0' }}>
          <div className="container mx-auto px-4 text-center">
            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Shield size={16} />
              <strong>Disclaimer:</strong> This tool is for personal use only. Please respect the copyright of the content creators. Do not download copyrighted material without permission.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 container mx-auto px-4 max-w-4xl" style={{ color: 'var(--gray-400)' }}>
          {/* Ad Slot 1 */}
          <div style={{ width: '100%', height: '90px', background: '#111111', border: '1px solid var(--gray-800)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', marginBottom: '48px' }}>
            <span>Ad Placeholder</span>
          </div>

          <article className="prose space-y-8" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            <h2>The Ultimate Instagram Video Downloader</h2>
            <p>
              In today's fast-paced digital landscape, video content has undeniably become the primary medium through which we consume information, entertainment, and education. Our Instagram Downloader offers the most efficient, user-friendly, and comprehensive solution for saving Instagram content directly to your device for seamless offline viewing.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
