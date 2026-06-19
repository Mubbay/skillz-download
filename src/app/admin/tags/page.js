'use client';

import { useState, useEffect } from 'react';
import {
  Tag as TagIcon,
  Trash2,
  AlertTriangle,
  Loader2,
  Plus
} from 'lucide-react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '32px',
    alignItems: 'start',
  },
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
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 700,
    color: 'var(--gray-800)',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  label: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--gray-700)',
  },
  tableWrapper: {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--gray-100)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    background: 'var(--gray-50)',
    padding: '16px 24px',
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--gray-500)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--gray-100)',
    textAlign: 'left',
  },
  td: {
    padding: '16px 24px',
    fontSize: '0.9rem',
    color: 'var(--gray-700)',
    borderBottom: '1px solid var(--gray-100)',
  },
  actionBtn: {
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    background: 'transparent',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
    color: 'var(--accent-600)',
  },
  loadingContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    color: 'var(--gray-400)',
  },
};

export default function AdminTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form fields
  const [name, setName] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchTags = () => {
    setLoading(true);
    fetch('/api/admin/tags')
      .then((res) => res.json())
      .then((data) => {
        setTags(data.tags || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create tag');

      setName('');
      fetchTags();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, tagName) => {
    if (!confirm(`Are you sure you want to delete tag #${tagName.toLowerCase()}? Any posts using this tag will remain, but this tag association will be deleted.`)) return;

    try {
      const res = await fetch(`/api/admin/tags/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete tag');

      fetchTags();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 style={styles.title}>Tags</h1>

      <div style={styles.container}>
        {/* Left: Add New Tag Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <TagIcon size={18} style={{ color: 'var(--primary-600)' }} />
            Add New Tag
          </h2>

          {error && (
            <div style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', color: 'var(--accent-700)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Tag Name</label>
              <input
                type="text"
                placeholder="e.g. guide"
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                The tag name should be lowercase without spaces.
              </span>
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
              {submitting ? 'Creating...' : 'Add New Tag'}
            </button>
          </form>
        </div>

        {/* Right: Table showing tags */}
        <div>
          <div style={styles.tableWrapper}>
            {loading ? (
              <div style={styles.loadingContainer}>
                <Loader2 className="spinner" size={24} style={{ color: 'var(--primary-600)' }} />
                <span>Loading tags...</span>
              </div>
            ) : tags.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-400)' }}>
                No tags found. Create one on the left!
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Tag</th>
                    <th style={styles.th}>Slug</th>
                    <th style={styles.th}>Posts Count</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.id}>
                      <td style={{ ...styles.td, fontWeight: 600 }}>#{tag.name.toLowerCase()}</td>
                      <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--gray-400)' }}>{tag.slug}</td>
                      <td style={styles.td}>{tag._count?.posts || 0}</td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(tag.id, tag.name)}
                          style={styles.actionBtn}
                          title="Delete Tag"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
