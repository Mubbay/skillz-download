'use client';

import { useState } from 'react';
import { Download, Clipboard, AlertTriangle, Clock } from 'lucide-react';

export default function DownloadForm({ platformName = 'Video', placeholder = 'Paste your video URL here...' }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // Clipboard access denied
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    // Platform validation
    const urlLower = url.toLowerCase();
    if (platformName === 'TikTok' && !urlLower.includes('tiktok.com') && !urlLower.includes('iesdouyin.com')) {
      setError('Please enter a valid TikTok URL.');
      setLoading(false);
      return;
    }
    if (platformName === 'Facebook' && !urlLower.includes('facebook.com') && !urlLower.includes('fb.watch') && !urlLower.includes('fb.video')) {
      setError('Please enter a valid Facebook URL.');
      setLoading(false);
      return;
    }
    if (platformName === 'YouTube' && !urlLower.includes('youtube.com') && !urlLower.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL.');
      setLoading(false);
      return;
    }
    if (platformName === 'Instagram' && !urlLower.includes('instagram.com')) {
      setError('Please enter a valid Instagram URL.');
      setLoading(false);
      return;
    }
    if (platformName === 'Twitter' || platformName === 'X') {
      if (!urlLower.includes('twitter.com') && !urlLower.includes('x.com')) {
        setError('Please enter a valid X (Twitter) URL.');
        setLoading(false);
        return;
      }
    }
    if (platformName === 'Vimeo' && !urlLower.includes('vimeo.com')) {
      setError('Please enter a valid Vimeo URL.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process video');
      }

      setResult(data);
      
      // Track tool usage asynchronously
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'toolUsage', 
          id: `${platformName.toLowerCase()}-downloader`,
          name: `${platformName} Downloader`
        })
      }).catch(() => {});

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="download-box animate-fade-in-up delay-3">
      <form onSubmit={handleDownload}>
        <div className="download-input-wrapper">
          <input
            type="url"
            placeholder={placeholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                Processing...
              </>
            ) : (
              <>
                <Download size={18} />
                Download
              </>
            )}
          </button>
        </div>
      </form>

      {/* Paste button */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
        <button
          onClick={handlePaste}
          className="btn btn-ghost btn-sm"
          type="button"
        >
          <Clipboard size={14} />
          Paste from clipboard
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="animate-scale-in" style={{
          maxWidth: '600px',
          margin: '20px auto 0',
          padding: '14px 20px',
          background: 'var(--accent-50)',
          border: '1px solid var(--accent-200)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--accent-700)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.95rem',
          textAlign: 'left'
        }}>
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="card animate-scale-in" style={{
          maxWidth: '600px',
          margin: '24px auto 0',
          padding: '24px',
          textAlign: 'left',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                style={{
                  width: '160px',
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {result.title || `${platformName} Video`}
              </h4>
              {result.duration && (
                <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {result.duration}
                </span>
              )}
            </div>
          </div>

          {result.formats && result.formats.length > 0 && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gray-600)' }}>Available formats:</p>
              {result.formats.map((fmt, i) => {
                const proxyUrl = `/api/proxy?url=${encodeURIComponent(fmt.url)}&title=${encodeURIComponent(result.title)}&ext=${fmt.ext || 'mp4'}`;
                
                return (
                  <a
                    key={i}
                    href={proxyUrl}
                    download
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span>{fmt.quality || fmt.format} {fmt.ext && `(.${fmt.ext})`}</span>
                    <Download size={14} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
