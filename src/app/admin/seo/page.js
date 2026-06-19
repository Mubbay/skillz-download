'use client';

import { useState, useEffect } from 'react';
import { Save, FileText, Search, Code, Loader2 } from 'lucide-react';

export default function SeoSettingsPage() {
  const [settings, setSettings] = useState({
    googleSearchConsoleCode: '',
    robotsTxtContent: '',
    adsTxtContent: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          googleSearchConsoleCode: data.googleSearchConsoleCode || '',
          robotsTxtContent: data.robotsTxtContent || '',
          adsTxtContent: data.adsTxtContent || ''
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (err) {
      setMessage('Error saving settings.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="spinner" size={32} /></div>;

  return (
    <div className="card" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <Search size={28} style={{ color: 'var(--primary-600)' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>SEO & Site Settings</h1>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <Code size={18} /> Google Search Console Code
          </label>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '8px' }}>
            Paste the value of your google-site-verification meta tag (e.g. `your-code-here`)
          </p>
          <input
            type="text"
            name="googleSearchConsoleCode"
            className="form-input"
            value={settings.googleSearchConsoleCode}
            onChange={handleChange}
            placeholder="Ex: uX7...8P2Q"
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <FileText size={18} /> robots.txt
          </label>
          <textarea
            name="robotsTxtContent"
            className="form-input"
            style={{ minHeight: '150px', fontFamily: 'monospace' }}
            value={settings.robotsTxtContent}
            onChange={handleChange}
            placeholder={`User-agent: *\nAllow: /`}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <FileText size={18} /> ads.txt
          </label>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '8px' }}>
            For Google AdSense or other ad networks
          </p>
          <textarea
            name="adsTxtContent"
            className="form-input"
            style={{ minHeight: '150px', fontFamily: 'monospace' }}
            value={settings.adsTxtContent}
            onChange={handleChange}
            placeholder="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <Loader2 className="spinner" size={18} /> : <Save size={18} />}
            Save Settings
          </button>
          {message && <span style={{ color: message.includes('success') ? 'var(--success-600)' : 'var(--accent-600)', fontWeight: 500 }}>{message}</span>}
        </div>
      </form>
    </div>
  );
}
