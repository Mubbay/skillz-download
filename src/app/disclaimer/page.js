import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Disclaimer & Terms | Skillz Download',
  description: 'Disclaimer and Terms of Service for Skillz Download.',
};

export default function DisclaimerPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      <main style={{ minHeight: '80vh', padding: '60px 20px' }}>
        <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Disclaimer & Terms of Service</h1>
          <div className="prose" style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>1. Educational and Personal Use Only</h2>
            <p>Skillz Download is provided for educational and personal use only. Our tool is designed to allow users to download their own videos or videos that are in the public domain or freely licensed.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>2. Copyright Infringement</h2>
            <p>We do not support, condone, or encourage the downloading of copyrighted material without the explicit permission of the copyright owner. By using this service, you agree that you are solely responsible for checking the copyright status of any video you download.</p>
            <p>If you use our tool to download copyrighted material without permission, you assume all legal responsibilities and risks associated with copyright infringement.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>3. Service Availability</h2>
            <p>We make no guarantees regarding the uptime, availability, or continued functionality of the service. Supported platforms may change their algorithms, which may temporarily or permanently break downloading functionality.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>4. Limitation of Liability</h2>
            <p>In no event shall Skillz Download or its operators be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use the service.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
