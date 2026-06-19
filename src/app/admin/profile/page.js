'use client';

import { useState } from 'react';
import { User, Lock, Mail, Save, Loader2, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage('Profile updated successfully!');
        setFormData(prev => ({ ...prev, password: '' })); // clear password field
      } else {
        setMessage('Error updating profile.');
      }
    } catch (err) {
      setMessage('Error updating profile.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="card" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <User size={24} style={{ color: 'var(--primary-600)' }} />
        My Profile
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <User size={16} /> Name
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter new name"
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <Mail size={16} /> Email
          </label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter new email"
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '8px' }}>
            <Lock size={16} /> New Password
          </label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading || (!formData.name && !formData.email && !formData.password)}>
            {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} />}
            Update Profile
          </button>
          {message && (
            <span style={{ color: message.includes('success') ? 'var(--success-600)' : 'var(--accent-600)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {message.includes('success') && <CheckCircle size={16} />} {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
