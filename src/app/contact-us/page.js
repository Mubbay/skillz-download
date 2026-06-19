import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, User, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Skillz Download',
  description: 'Get in touch with the Skillz Download team.',
};

export default function ContactUsPage() {
  return (
    <div className="page-wrapper bg-dot-pattern" style={{ minHeight: '100vh', background: 'var(--gray-950)' }}>
      <Header />
      <main style={{ minHeight: '80vh', padding: '60px 20px' }}>
        <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', background: '#111111', padding: '40px', borderRadius: '16px', border: '1px solid var(--gray-800)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', color: 'white' }}>Contact Us</h1>
            <p style={{ color: 'var(--gray-400)', fontSize: '1.1rem' }}>Have a question or feedback? We'd love to hear from you.</p>
          </div>

          <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* IMPORTANT: The user must replace the value below with their actual Web3Forms access key */}
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
            
            {/* Optional: Add a redirect URL upon successful submission */}
            <input type="hidden" name="redirect" value="https://skillzdownload.com/contact-us?success=true" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--gray-300)', fontSize: '0.9rem', fontWeight: 600 }}>Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-500)' }} />
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    style={{ width: '100%', padding: '14px 16px 14px 44px', background: '#18181b', border: '1px solid var(--gray-700)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} 
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--gray-300)', fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-500)' }} />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com"
                    style={{ width: '100%', padding: '14px 16px 14px 44px', background: '#18181b', border: '1px solid var(--gray-700)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} 
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--gray-300)', fontSize: '0.9rem', fontWeight: 600 }}>Message</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--gray-500)' }} />
                <textarea 
                  name="message" 
                  required 
                  placeholder="How can we help you?"
                  rows="6"
                  style={{ width: '100%', padding: '14px 16px 14px 44px', background: '#18181b', border: '1px solid var(--gray-700)', borderRadius: '8px', color: 'white', fontSize: '1rem', resize: 'vertical' }} 
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px', borderRadius: '8px' }}>
              <Send size={18} /> Send Message
            </button>

            <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.85rem', marginTop: '16px' }}>
              We'll get back to you as soon as possible.
            </p>
          </form>

        </div>
      </main>
      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-500) !important;
          box-shadow: 0 0 0 2px rgba(var(--primary-500-rgb), 0.2);
        }
      `}} />
    </div>
  );
}
