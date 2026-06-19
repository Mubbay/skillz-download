'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Shield, ShieldAlert, Loader2, Save } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'editor' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleRoleChange = async (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateRole', id, role: newRole })
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', ...formData })
    });
    if (res.ok) {
      setShowAddForm(false);
      setFormData({ name: '', email: '', password: '', role: 'editor' });
      fetchUsers();
    } else {
      alert('Failed to add user');
    }
    setSubmitting(false);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Loader2 className="spinner" size={40} /></div>;

  return (
    <div className="card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={28} style={{ color: 'var(--primary-600)' }} />
          User Management
        </h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm">
          <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} style={{ background: 'var(--gray-50)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--gray-200)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ gridColumn: '1 / -1', fontWeight: 700, marginBottom: '8px' }}>Add New User</div>
          <input type="text" placeholder="Name" required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <select className="form-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
            <option value="editor">Editor</option>
            <option value="admin">Administrator</option>
          </select>
          <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? <Loader2 className="spinner" size={16} /> : <Save size={16} />} Save User
            </button>
          </div>
        </form>
      )}

      <div className="table-wrapper" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Email</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '16px', fontWeight: 600 }}>{user.name}</td>
                <td style={{ padding: '16px', color: 'var(--gray-600)' }}>{user.email}</td>
                <td style={{ padding: '16px' }}>
                  <select 
                    className="form-input" 
                    style={{ padding: '6px 12px', width: 'auto', background: user.role === 'admin' ? 'var(--primary-50)' : 'var(--gray-50)', color: user.role === 'admin' ? 'var(--primary-700)' : 'var(--gray-700)', border: 'none', fontWeight: 600 }}
                    value={user.role} 
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Administrator</option>
                    <option value="editor">Editor</option>
                  </select>
                </td>
                <td style={{ padding: '16px', color: 'var(--gray-400)', fontSize: '0.9rem' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
