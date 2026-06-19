import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Skillz Download',
  description: 'Privacy Policy for Skillz Download video downloader tool.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      <main style={{ minHeight: '80vh', padding: '60px 20px' }}>
        <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Privacy Policy</h1>
          <div className="prose" style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>1. Introduction</h2>
            <p>Welcome to Skillz Download. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>2. Data We Collect</h2>
            <p>We do not collect personal data from general users who visit our site to use the video downloading service. We only process the URLs you provide to fetch the requested media. These URLs are not permanently stored in our databases.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>3. Cookies</h2>
            <p>We use cookies to improve your experience on our site, particularly for the admin functionality and analytics. You can set your browser to refuse all or some browser cookies.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>4. Third-Party Links and Ads</h2>
            <p>Our website may include third-party advertising (like Google AdSense) and links to third-party websites. Clicking on those links or enabling those connections may allow third parties to collect or share data about you.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>5. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us through our website.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
