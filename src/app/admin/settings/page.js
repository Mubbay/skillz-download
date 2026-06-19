'use client';

import { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const styles = {
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
    marginBottom: '28px',
  },
  card: {
    background: 'white',
    border: '1px solid var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    boxShadow: 'var(--shadow-sm)',
    maxWidth: '700px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '24px',
  },
  label: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--gray-700)',
  },
  input: {
    width: '100%',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '12px 16px',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 0',
    color: 'var(--gray-500)',
    gap: '12px',
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: '',
    siteName: '',
    disclaimerText: '',
    adsenseId: '',
    contactEmail: '',
    geminiApiKey: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load settings');
        return res.json();
      })
      .then((data) => {
        // Fallback to default structure to prevent undefined errors if DB is empty
        setSettings({
          siteTitle: data.siteTitle || '',
          siteName: data.siteName || '',
          disclaimerText: data.disclaimerText || '',
          adsenseId: data.adsenseId || '',
          contactEmail: data.contactEmail || '',
          geminiApiKey: data.geminiApiKey || '',
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, val) => {
    setSettings((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setSuccess('Settings updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 className="spinner" size={40} style={{ color: 'var(--primary-600)' }} />
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Loading system settings...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 style={styles.title}>General Settings</h1>

      {success && (
        <div className="animate-scale-in" style={{ background: 'var(--success-50)', border: '1px solid var(--success-200)', color: 'var(--success-700)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '700px' }}>
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '0.9rem' }}>{success}</span>
        </div>
      )}

      {error && (
        <div className="animate-scale-in" style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', color: 'var(--accent-700)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '700px' }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: '0.9rem' }}>{error}</span>
        </div>
      )}

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              required
              style={styles.input}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              Used in the header logo and copyright notices.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Global SEO Site Title</label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
              required
              style={styles.input}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              Appears in browser tabs and search engine tags.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Google AdSense Publisher ID</label>
            <input
              type="text"
              placeholder="e.g. ca-pub-xxxxxxxxxxxxxxxx"
              value={settings.adsenseId}
              onChange={(e) => handleChange('adsenseId', e.target.value)}
              style={styles.input}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              Your Google AdSense account ID. Used to load ads dynamically across landing pages.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Google Gemini API Key (Pro Plan)</label>
            <input
              type="password"
              placeholder="e.g. AIzaSy..."
              value={settings.geminiApiKey || ''}
              onChange={(e) => handleChange('geminiApiKey', e.target.value)}
              style={styles.input}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              Used by the Auto-Blogging Daemon to generate articles and Imagen 3 images.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              required
              style={styles.input}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              Site administrator contact email.
            </span>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Global Copyright Legal Disclaimer</label>
            <textarea
              value={settings.disclaimerText}
              onChange={(e) => handleChange('disclaimerText', e.target.value)}
              required
              style={styles.textarea}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
              High-visibility disclaimer text displayed on homepage and downloader subpages to conform with search engine requirements.
            </span>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ display: 'inline-flex', gap: '8px' }}>
            {saving ? (
              <>
                <Loader2 className="spinner" size={16} />
                Saving settings...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Settings
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
