import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadForm from '@/components/DownloadForm';
import FaqSection from '@/components/FaqSection';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import {
  Download, Zap, Shield, Globe, Clock, Smartphone,
  ChevronDown, ChevronUp, Play, Clipboard, CheckCircle,
  Star, Lock, Wifi, MonitorPlay, Music, Film,
  AlertTriangle, ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';


const platforms = [
  { name: 'YouTube', color: '#FF0000', gradient: 'linear-gradient(135deg, #FF0000, #CC0000)', iconSrc: '/img/youtube-svgrepo-com.svg', href: '/youtube-downloader', desc: 'Download YouTube videos in HD, 4K, MP3' },
  { name: 'TikTok', color: '#00f2ea', gradient: 'linear-gradient(135deg, #00f2ea, #ff0050)', iconSrc: '/img/tiktok-svgrepo-com.svg', href: '/tiktok-downloader', desc: 'Save TikTok videos without watermark' },
  { name: 'Facebook', color: '#1877F2', gradient: 'linear-gradient(135deg, #1877F2, #0d5bbf)', iconSrc: '/img/facebook-svgrepo-com.svg', href: '/facebook-downloader', desc: 'Download Facebook videos & reels' },
  { name: 'Vimeo', color: '#1ab7ea', gradient: 'linear-gradient(135deg, #1ab7ea, #162221)', iconSrc: '/img/vimeo-svgrepo-com.svg', href: '/vimeo-downloader', desc: 'Save Vimeo videos in best quality' },
  { name: 'Instagram', color: '#E4405F', gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', iconSrc: '/img/instagram-svgrepo-com.svg', href: '/', desc: 'Download Instagram reels & stories' },
  { name: 'Twitter / X', color: '#000', gradient: 'linear-gradient(135deg, #15202B, #1DA1F2)', icon: '𝕏', href: '/', desc: 'Save Twitter/X videos instantly' },
];

const features = [
  { icon: <Star size={24} />, title: 'Free Forever', desc: 'No subscriptions, no hidden fees. Download unlimited videos completely free.', color: '#f59e0b', bg: '#fffbeb' },
  { icon: <Zap size={24} />, title: 'Lightning Fast', desc: 'Our optimized servers process your downloads in seconds, not minutes.', color: '#7c3aed', bg: '#f3f0ff' },
  { icon: <Film size={24} />, title: 'All Formats', desc: 'Choose MP4, WebM, MP3, and more. From 360p to 4K resolution.', color: '#0ea5e9', bg: '#f0f9ff' },
  { icon: <Lock size={24} />, title: 'No Registration', desc: 'Start downloading immediately. No account or sign-up required.', color: '#10b981', bg: '#ecfdf5' },
  { icon: <Shield size={24} />, title: 'Secure & Private', desc: 'Your downloads are private. We don\'t store your data or history.', color: '#f43f5e', bg: '#fff1f3' },
  { icon: <Smartphone size={24} />, title: 'Cross-Platform', desc: 'Works on desktop, tablet, and mobile. Any browser, any device.', color: '#8b5cf6', bg: '#f5f3ff' },
];

const faqs = [
  { q: 'Is Skillz Download really free?', a: 'Yes! Skillz Download is completely free to use. There are no hidden charges, subscription fees, or premium tiers. You can download unlimited videos from supported platforms without paying anything.' },
  { q: 'What video formats can I download?', a: 'We support a wide range of formats including MP4 (most common), WebM, MKV, and audio-only formats like MP3 and M4A. Quality options range from 360p up to 4K/2160p depending on the source video.' },
  { q: 'Is it legal to download online videos?', a: 'Downloading videos for personal, non-commercial use is generally permissible. However, you should only download content you have the right to access. Always respect copyright laws and content creator rights. This tool is intended for downloading your own content or content that is explicitly free to download.' },
  { q: 'Do I need to install any software?', a: 'No installation is required. Skillz Download works entirely in your web browser. Just paste a URL, select your preferred format and quality, and click download. It works on any modern browser on any device.' },
  { q: 'Which platforms are supported?', a: 'We support over 1000+ websites including YouTube, TikTok, Facebook, Vimeo, Instagram, Twitter/X, Dailymotion, Twitch, and many more. If a platform hosts public video content, chances are we can download from it.' },
  { q: 'Why did my download fail?', a: 'Downloads can fail if the video is private, age-restricted, geo-blocked, or if the URL is incorrect. Make sure you\'re using the full video URL. Some platforms may also temporarily block extraction. Try again in a few minutes or try a different format.' },
];

export default function Home() {

  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />

      {/* Top Stats Bar */}
      <div style={{ background: '#111111', borderBottom: '1px solid var(--gray-800)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)' }}>1M+</span> <span style={{ color: 'var(--gray-400)' }}>Downloads</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)' }}>100%</span> <span style={{ color: 'var(--gray-400)' }}>Free Forever</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)' }}>50+</span> <span style={{ color: 'var(--gray-400)' }}>Platforms</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--primary-500)' }}>ISO 27001</span> <span style={{ color: 'var(--gray-400)' }}>Secure</span>
          </div>
        </div>
      </div>

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
            <Zap size={16} />
            Lightning Fast Video Extraction
          </span>
        </div>

        <h1 className="animate-fade-in-up delay-1" style={{ maxWidth: '900px', margin: '0 auto 24px', fontWeight: 800 }}>
          Download Any Video.<br/>
          <span style={{ color: 'var(--primary-500)' }}>Zero Guesswork.</span>
        </h1>

        <p className="animate-fade-in-up delay-2" style={{ maxWidth: '600px', margin: '0 auto 48px', fontSize: '1.2rem', color: 'var(--gray-300)' }}>
          Paste any video URL from YouTube, TikTok, Facebook, and 1000+ more sites. Choose your format and quality. Download in seconds.
        </p>

        <DownloadForm platformName="Video" placeholder="Paste your video URL here..." />
      </section>

      {/* Supported Platforms */}
      <section className="section" style={{ background: 'var(--gray-950)', padding: '100px 24px' }}>
        <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
          <h2 className="animate-fade-in-up" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>Supported Platforms</h2>
          <p className="animate-fade-in-up delay-1" style={{ color: 'var(--gray-400)', fontSize: '1.2rem', marginTop: '16px' }}>Download from your favorite platforms in just a few clicks</p>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {platforms.map((p, i) => (
            <div key={p.name} className="card" style={{ background: '#111111', border: '1px solid var(--gray-800)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.iconSrc ? <Image src={p.iconSrc} alt={p.name} width={32} height={32} style={{ filter: 'brightness(0) invert(1)' }} /> : <span style={{ fontSize: '2rem', color: 'white' }}>{p.icon}</span>}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>{p.name}</h3>
                </div>
                <p style={{ color: 'var(--gray-400)', fontSize: '1rem', marginBottom: '30px', flexGrow: 1 }}>{p.desc}</p>
                <Link href={p.href} style={{ color: 'var(--primary-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                  Start Downloading <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ 
        padding: '100px 24px',
        backgroundImage: 'linear-gradient(rgba(17, 17, 17, 0.85), rgba(17, 17, 17, 0.95)), url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
          <h2 className="animate-fade-in-up" style={{ fontSize: '3rem', letterSpacing: '-0.02em', color: 'white' }}>Why Choose Skillz Download?</h2>
          <p className="animate-fade-in-up delay-1" style={{ color: 'var(--gray-400)', fontSize: '1.2rem', marginTop: '16px' }}>The most powerful and easy-to-use video downloader on the web</p>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <div key={f.title} className="card-glass" style={{ padding: '32px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ color: 'var(--primary-500)' }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '8px' }}>{f.title}</h3>
                  <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: '#111111', padding: '100px 24px' }}>
        <div className="section-header" style={{ marginBottom: '80px' }}>
          <h2 className="animate-fade-in-up" style={{ fontSize: '3rem' }}>Three steps. Zero guesswork.</h2>
        </div>

        <div className="container" style={{ position: 'relative', maxWidth: '1000px' }}>
          {/* Connecting dashed line (desktop only) */}
          <div style={{ position: 'absolute', top: '40px', left: '150px', right: '150px', borderTop: '2px dashed var(--gray-800)', zIndex: 0 }} className="hidden md:block"></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', position: 'relative', zIndex: 1 }}>
            {[
              { step: '01', icon: <Clipboard size={32} />, title: 'Upload Your Link', desc: 'Drop your video URL into the extractor. Get instant media parsing.' },
              { step: '02', icon: <MonitorPlay size={32} />, title: 'Configure Format', desc: 'Choose output format, resolution, and audio quality. See live options instantly.' },
              { step: '03', icon: <Download size={32} />, title: 'Receive Your File', desc: 'We process and serve the file directly to your device. Tracked delivery.' },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--gray-800)', lineHeight: 1, marginBottom: '20px' }}>{s.step}</div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '2px solid var(--primary-500)',
                  background: '#18181b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 30px',
                  color: 'var(--primary-500)'
                }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container" style={{ padding: '0 24px', marginTop: '40px' }}>
        <div className="card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#18181b', borderColor: 'var(--gray-800)' }}>
          <Lock size={24} style={{ color: 'var(--gray-500)', flexShrink: 0 }} />
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>
            Your downloads are private. This tool is designed for personal use only. Skillz Download does not support or encourage downloading copyrighted content. NDA available on request.
          </p>
        </div>
      </div>

      {/* Latest Blog Posts Section */}
      <LatestBlogPosts />

      {/* FAQ Section */}
      <FaqSection faqs={faqs} />

      {/* Footer Design implemented in Footer component */}
      <Footer />
    </div>
  );
}
