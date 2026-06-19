'use client';

import { useState, useEffect } from 'react';
import {
  Upload,
  Copy,
  Trash2,
  AlertCircle,
  CheckCircle2,
  FileImage,
  File,
  Loader2,
  Plus
} from 'lucide-react';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.75rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
  },
  uploadCard: {
    background: 'white',
    border: '2px dashed var(--gray-200)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    textAlign: 'center',
    marginBottom: '32px',
    transition: 'all 200ms ease',
    cursor: 'pointer',
  },
  uploadCardHover: {
    borderColor: 'var(--primary-400)',
    background: '#fcfbfe',
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '24px',
  },
  mediaCard: {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--gray-200)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingBottom: '60%', // Aspect ratio 5:3
    background: 'var(--gray-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottom: '1px solid var(--gray-100)',
  },
  imagePreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  fileIconFallback: {
    position: 'absolute',
    color: 'var(--gray-400)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
  },
  cardMeta: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  filename: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--gray-800)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '4px',
  },
  fileSize: {
    fontSize: '0.75rem',
    color: 'var(--gray-400)',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    borderTop: '1px solid var(--gray-100)',
    paddingTop: '12px',
  },
  actionButton: {
    flex: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    padding: '8px 12px',
  },
};

export default function AdminMediaPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [alt, setAlt] = useState('');

  // Status banners
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fetchMedia = () => {
    setLoading(true);
    fetch('/api/admin/media')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load media files');
        return res.json();
      })
      .then((data) => {
        setMediaItems(data.mediaItems || []);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload file');

      setSuccessMsg(`"${file.name}" uploaded successfully!`);
      setAlt('');
      fetchMedia();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleUpload(file);
  };

  const handleDelete = async (id, filename) => {
    if (!confirm(`Are you sure you want to permanently delete "${filename}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete file');

      setSuccessMsg('Media item deleted.');
      fetchMedia();
    } catch (err) {
      alert(err.message);
    }
  };

  const copyUrlToClipboard = (id, relativeUrl) => {
    const absoluteUrl = `${window.location.origin}${relativeUrl}`;
    navigator.clipboard.writeText(absoluteUrl)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => console.error(err));
  };

  const formatBytes = (bytes, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Media Library</h1>
      </div>

      {/* Status banners */}
      {successMsg && (
        <div className="animate-scale-in" style={{ background: 'var(--success-50)', border: '1px solid var(--success-200)', color: 'var(--success-700)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '0.9rem' }}>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="animate-scale-in" style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', color: 'var(--accent-700)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: '0.9rem' }}>{errorMsg}</span>
        </div>
      )}

      {/* Drag & Drop Upload card */}
      <label
        style={{
          ...styles.uploadCard,
          ...(isDragOver ? styles.uploadCardHover : {}),
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files?.[0];
          handleUpload(file);
        }}
      >
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Loader2 className="spinner" size={32} style={{ color: 'var(--primary-600)' }} />
            <p style={{ fontWeight: 600 }}>Uploading file to server...</p>
          </div>
        ) : (
          <div>
            <Upload size={32} style={{ margin: '0 auto 12px', color: 'var(--gray-400)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gray-700)', marginBottom: '4px' }}>
              Drag & Drop file here, or click to browse
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>
              Supports Images (PNG, JPG, WEBP) and other documents up to 10MB
            </p>
          </div>
        )}
      </label>

      {/* Media grid list */}
      {loading && mediaItems.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', color: 'var(--gray-400)' }}>
          <Loader2 className="spinner" size={32} style={{ color: 'var(--primary-600)', marginBottom: '12px' }} />
          <span>Loading your media library...</span>
        </div>
      ) : mediaItems.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', color: 'var(--gray-400)' }}>
          <FileImage size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <p style={{ fontWeight: 600 }}>No media files uploaded yet</p>
          <p style={{ fontSize: '0.85rem' }}>Upload files above to start compiling your image resources.</p>
        </div>
      ) : (
        <div style={styles.mediaGrid}>
          {mediaItems.map((item) => {
            const isImage = item.mimetype?.startsWith('image/');
            return (
              <div key={item.id} style={styles.mediaCard}>
                {/* Visual Preview */}
                <div style={styles.imageWrapper}>
                  {isImage ? (
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      style={styles.imagePreview}
                    />
                  ) : (
                    <div style={styles.fileIconFallback}>
                      <File size={36} />
                    </div>
                  )}
                </div>

                {/* Meta details */}
                <div style={styles.cardMeta}>
                  <div>
                    <div style={styles.filename} title={item.filename}>{item.filename}</div>
                    <div style={styles.fileSize}>{formatBytes(item.size)}</div>
                  </div>

                  <div style={styles.cardActions}>
                    <button
                      onClick={() => copyUrlToClipboard(item.id, item.url)}
                      className={copiedId === item.id ? 'btn btn-success' : 'btn btn-secondary'}
                      style={{ ...styles.actionButton, flex: 1.5 }}
                    >
                      {copiedId === item.id ? 'Copied!' : (
                        <>
                          <Copy size={12} />
                          Copy Link
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.filename)}
                      className="btn btn-ghost"
                      style={{ ...styles.actionButton, color: 'var(--accent-600)', borderColor: 'var(--gray-200)', flex: 0.8 }}
                      title="Delete item"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
