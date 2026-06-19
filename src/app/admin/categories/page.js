'use client';

import { useState, useEffect } from 'react';
import {
  FolderPlus,
  Trash2,
  AlertTriangle,
  Loader2,
  FolderTree
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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = () => {
    setLoading(true);
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create category');

      setName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, catName) => {
    if (catName.toLowerCase() === 'uncategorized') {
      alert('The default Uncategorized category cannot be deleted.');
      return;
    }

    if (!confirm(`Are you sure you want to delete category "${catName}"? Any posts in this category will remain, but this category association will be deleted.`)) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete category');

      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 style={styles.title}>Categories</h1>

      <div style={styles.container}>
        {/* Left: Add New Category Form */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FolderPlus size={18} style={{ color: 'var(--primary-600)' }} />
            Add New Category
          </h2>

          {error && (
            <div style={{ background: 'var(--accent-50)', border: '1px solid var(--accent-200)', color: 'var(--accent-700)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                placeholder="e.g. Tutorials"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                The name is how it appears on your site.
              </span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Write a brief description for this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', minHeight: '80px', padding: '10px 14px', fontSize: '0.9rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
              {submitting ? 'Creating...' : 'Add New Category'}
            </button>
          </form>
        </div>

        {/* Right: Table showing categories */}
        <div>
          <div style={styles.tableWrapper}>
            {loading ? (
              <div style={styles.loadingContainer}>
                <Loader2 className="spinner" size={24} style={{ color: 'var(--primary-600)' }} />
                <span>Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-400)' }}>
                No categories found. Create one on the left!
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Slug</th>
                    <th style={styles.th}>Posts Count</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{cat.name}</td>
                      <td style={{ ...styles.td, color: 'var(--gray-500)' }}>{cat.description || '—'}</td>
                      <td style={{ ...styles.td, fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--gray-400)' }}>{cat.slug}</td>
                      <td style={styles.td}>{cat._count?.posts || 0}</td>
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        {cat.slug !== 'uncategorized' && (
                          <button
                            onClick={() => handleDelete(cat.id, cat.name)}
                            style={styles.actionBtn}
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
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
