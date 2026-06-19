import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | Skillz Download',
  description: 'Learn more about Skillz Download, the ultimate video downloader.',
};

export default function AboutUsPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      <main style={{ minHeight: '80vh', padding: '60px 20px' }}>
        <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: 'white' }}>About Us</h1>
          <div className="prose" style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
            
            <p style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--gray-400)' }}>
              Skillz Download is a leading platform dedicated to providing the fastest and most reliable video downloading services on the internet.
            </p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>Our Mission</h2>
            <p>Our mission is simple: to make digital media accessible anywhere, anytime, without restrictions. We believe that users should have the freedom to enjoy their favorite content offline, whether it's for educational purposes, personal archiving, or creative projects.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>What We Do</h2>
            <p>We provide a streamlined, secure, and lightning-fast tool to download videos from over 1,000+ platforms including YouTube, TikTok, Facebook, Vimeo, Instagram, and X (Twitter). Our optimized infrastructure ensures that you get your files in the highest possible quality—ranging from MP3 audio to 4K video—in mere seconds.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>Why Choose Us?</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '24px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>100% Free:</strong> No hidden fees, no subscriptions.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>No Registration Required:</strong> Start downloading instantly without giving up personal data.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Privacy Focused:</strong> We don't store your download history or track your personal information.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: 'white' }}>Cross-Platform:</strong> Our tool works seamlessly on desktop, mobile, and tablets.</li>
            </ul>
            
            <p>Built with cutting-edge technology and a passion for open internet access, Skillz Download continues to evolve daily to support new platforms and deliver an unparalleled user experience.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
