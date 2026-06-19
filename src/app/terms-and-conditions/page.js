import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms and Conditions | Skillz Download',
  description: 'Terms and Conditions for using Skillz Download.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      <main style={{ minHeight: '80vh', padding: '60px 20px' }}>
        <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Terms and Conditions</h1>
          <div className="prose" style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>1. Introduction</h2>
            <p>Welcome to Skillz Download! By accessing our website, you agree to these Terms and Conditions. Please read them carefully. If you do not agree with any part of these terms, you must not use our service.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>2. Acceptable Use</h2>
            <p>Skillz Download provides a service to download videos and media for personal, non-commercial use only. You agree not to use the service for any unlawful purposes or to violate any copyright laws. You are solely responsible for ensuring you have the legal right to download the content you request.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>3. Intellectual Property</h2>
            <p>All content on the Skillz Download website, including logos, text, and design, is the property of Skillz Download or its licensors. You may not reproduce or distribute this content without permission. The media downloaded through our tool remains the intellectual property of its respective creators.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>4. Disclaimer of Warranties</h2>
            <p>Our service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not warrant that the service will be uninterrupted, secure, or error-free. We disclaim all warranties, express or implied, including fitness for a particular purpose.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>5. Limitation of Liability</h2>
            <p>In no event will Skillz Download be liable for any direct, indirect, special, or consequential damages arising out of your use of or inability to use the service, even if we have been advised of the possibility of such damages.</p>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px', color: 'white' }}>6. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the service constitutes your acceptance of the revised terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
