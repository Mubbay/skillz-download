'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials. Please try again.');
      }

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated background orbs */}
      <div style={styles.orbOne} />
      <div style={styles.orbTwo} />
      <div style={styles.orbThree} />

      <div style={styles.card} className="animate-fade-in-up">
        {/* Logo */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Download size={28} color="#fff" strokeWidth={2.5} />
          </div>
          <h1 style={styles.logoText}>
            Skillz Download
          </h1>
          <span style={styles.adminBadge}>Admin Panel</span>
        </div>

        <p style={styles.subtitle}>
          Sign in to manage your content and settings
        </p>

        {/* Error message */}
        {error && (
          <div style={styles.errorBox} className="animate-scale-in">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="email">Email Address</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.inputIcon} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skillzdownload.com"
                required
                disabled={loading}
                className="input"
                style={styles.inputField}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                className="input"
                style={styles.inputField}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} color="var(--gray-400)" />
                ) : (
                  <Eye size={18} color="var(--gray-400)" />
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={styles.submitBtn}
          >
            {loading ? (
              <>
                <Loader2 size={20} style={styles.spinner} />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer hint */}
        <div style={styles.footerHint}>
          <div style={styles.divider}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>Skillz Download CMS</span>
            <span style={styles.dividerLine} />
          </div>
          <p style={styles.securityNote}>
            🔒 Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Inline Styles ─── */
const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 8s ease-in-out infinite',
    position: 'relative',
    overflow: 'hidden',
  },

  /* Floating background orbs */
  orbOne: {
    position: 'absolute',
    top: '-10%',
    left: '-5%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
    animation: 'float 6s ease-in-out infinite',
    pointerEvents: 'none',
  },
  orbTwo: {
    position: 'absolute',
    bottom: '-15%',
    right: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)',
    animation: 'float 8s ease-in-out infinite',
    animationDelay: '2s',
    pointerEvents: 'none',
  },
  orbThree: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)',
    animation: 'float 7s ease-in-out infinite',
    animationDelay: '4s',
    pointerEvents: 'none',
  },

  card: {
    width: '100%',
    maxWidth: '460px',
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: 'var(--radius-2xl)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 25px 60px -12px rgba(0,0,0,0.2), 0 0 80px rgba(124, 58, 237, 0.1)',
    padding: '48px 40px 40px',
    position: 'relative',
    zIndex: 1,
  },

  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },

  logoIcon: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 40px -10px rgba(124, 58, 237, 0.5)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 3s ease-in-out infinite',
  },

  logoText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.6rem',
    color: 'var(--gray-900)',
    letterSpacing: '-0.02em',
    margin: 0,
    lineHeight: 1.2,
  },

  adminBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 14px',
    background: 'var(--primary-100)',
    color: 'var(--primary-700)',
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: '0.75rem',
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },

  subtitle: {
    textAlign: 'center',
    color: 'var(--gray-500)',
    fontSize: '0.95rem',
    marginBottom: '32px',
    marginTop: '4px',
  },

  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 'var(--radius-lg)',
    color: '#dc2626',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '24px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },

  label: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--gray-700)',
  },

  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: 'var(--gray-400)',
    pointerEvents: 'none',
    zIndex: 1,
  },

  inputField: {
    paddingLeft: '46px',
    paddingRight: '46px',
  },

  eyeButton: {
    position: 'absolute',
    right: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)',
    zIndex: 1,
  },

  submitBtn: {
    width: '100%',
    marginTop: '8px',
    fontSize: '1.05rem',
    padding: '16px 36px',
  },

  spinner: {
    animation: 'spin 1s linear infinite',
  },

  footerHint: {
    marginTop: '32px',
  },

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },

  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'var(--gray-200)',
  },

  dividerText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    color: 'var(--gray-400)',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
  },

  securityNote: {
    textAlign: 'center',
    color: 'var(--gray-400)',
    fontSize: '0.8rem',
    margin: 0,
  },
};
