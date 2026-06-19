'use client';

import { useState, useEffect } from 'react';
import { Bot, Plus, Loader2, Trash2, Edit2, CheckCircle, Clock } from 'lucide-react';

export default function AutoBlogPage() {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', categoryId: '', status: 'pending' });
  const [submitting, setSubmitting] = useState(false);

  const [autoblogActive, setAutoblogActive] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let intervalId;
    if (topics.some(t => t.status === 'generating')) {
      intervalId = setInterval(() => {
        fetchData(true);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [topics]);

  const fetchData = async (isBackgroundPoll = false) => {
    if (!isBackgroundPoll) setLoading(true);
    const [topicsRes, catsRes, settingsRes] = await Promise.all([
      fetch('/api/admin/autoblog'),
      fetch('/api/admin/categories'),
      fetch('/api/admin/settings')
    ]);
    const topicsData = await topicsRes.json();
    const catsData = await catsRes.json();
    const settingsData = await settingsRes.json();
    setTopics(topicsData);
    setCategories(catsData.categories || []);
    if (settingsData.autoblogActive === 'true') {
      setAutoblogActive(true);
    } else {
      setAutoblogActive(false);
    }
    if (!isBackgroundPoll) setLoading(false);
  };

  const toggleMasterSwitch = async () => {
    const newState = !autoblogActive;
    setAutoblogActive(newState);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ autoblogActive: newState ? 'true' : 'false' })
    });
  };

  const handleEdit = (topic) => {
    setFormData({ id: topic.id, title: topic.title, categoryId: topic.categoryId, status: topic.status });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this topic?')) return;
    await fetch('/api/admin/autoblog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    setTopics(topics.filter(t => t.id !== id));
  };

  const handleGenerate = async (id) => {
    setTopics(topics.map(t => t.id === id ? { ...t, status: 'generating', progress: 5, message: 'Starting...' } : t));
    
    await fetch('/api/admin/autoblog/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId: id })
    });
    fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const action = formData.id ? 'update' : 'create';
    const res = await fetch('/api/admin/autoblog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, action })
    });
    
    if (res.ok) {
      setShowForm(false);
      setFormData({ id: null, title: '', categoryId: '', status: 'pending' });
      fetchData();
    } else {
      alert('Failed to save topic.');
    }
    setSubmitting(false);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Loader2 className="spinner" size={40} /></div>;

  return (
    <div className="card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={28} style={{ color: 'var(--primary-600)' }} />
            Auto-Blogger Queue
          </h1>
          <p style={{ color: 'var(--gray-500)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            {topics.length} topics currently in queue for generation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={toggleMasterSwitch} 
            className="btn" 
            style={{ 
              background: autoblogActive ? '#ecfdf5' : 'var(--gray-100)', 
              color: autoblogActive ? 'var(--success-700)' : 'var(--gray-600)',
              border: `1px solid ${autoblogActive ? 'var(--success-200)' : 'var(--gray-300)'}`,
              fontWeight: 600,
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: autoblogActive ? 'var(--success-500)' : 'var(--gray-400)' }}></div>
            {autoblogActive ? 'Auto-Blogging is ON' : 'Auto-Blogging is OFF'}
          </button>
          
          <button onClick={() => { setShowForm(!showForm); setFormData({ id: null, title: '', categoryId: categories[0]?.id || '', status: 'pending' }); }} className="btn btn-primary btn-sm">
            <Plus size={16} /> {showForm ? 'Cancel' : 'Add Topic'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--gray-50)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--gray-200)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ gridColumn: '1 / -1', fontWeight: 700, marginBottom: '8px' }}>{formData.id ? 'Edit Topic' : 'Add New Topic'}</div>
          
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Topic Title</label>
            <input type="text" placeholder="e.g. How to Download YouTube Videos" required className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Category</label>
            <select required className="form-input" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} style={{ width: '100%' }}>
              <option value="">Select Category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Status</label>
            <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%' }}>
              <option value="pending">Pending</option>
              <option value="generating">Generating</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '8px', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? <Loader2 className="spinner" size={16} /> : <CheckCircle size={16} />} Save Topic
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      <div className="table-wrapper" style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Topic</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(topic => (
              <tr key={topic.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--gray-800)' }}>{topic.title}</div>
                  {topic.status === 'generating' && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '4px' }}>
                        <span>{topic.message || 'Generating...'}</span>
                        <span>{topic.progress || 0}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--gray-200)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${topic.progress || 0}%`, height: '100%', background: 'var(--primary-500)', transition: 'width 0.5s ease' }}></div>
                      </div>
                    </div>
                  )}
                  {topic.status === 'failed' && topic.message && (
                    <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--accent-600)' }}>
                      {topic.message}
                    </div>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <span className="badge" style={{ background: 'var(--primary-50)', color: 'var(--primary-700)' }}>{topic.category.name}</span>
                </td>
                <td style={{ padding: '16px' }}>
                  {topic.status === 'pending' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--gray-500)', fontSize: '0.85rem', fontWeight: 600 }}><Clock size={14} /> Pending</span>}
                  {topic.status === 'completed' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--success-600)', fontSize: '0.85rem', fontWeight: 600 }}><CheckCircle size={14} /> Completed</span>}
                  {topic.status === 'generating' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--primary-500)', fontSize: '0.85rem', fontWeight: 600 }}><Loader2 className="spinner" size={14} /> Generating</span>}
                  {topic.status === 'failed' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-600)', fontSize: '0.85rem', fontWeight: 600 }}><Clock size={14} /> Failed</span>}
                </td>
                <td style={{ padding: '16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  {(topic.status === 'pending' || topic.status === 'failed') && (
                    <button onClick={() => handleGenerate(topic.id)} className="btn btn-primary btn-sm" style={{ padding: '6px 12px' }}>
                      <Bot size={14} style={{ marginRight: '4px' }} /> Generate
                    </button>
                  )}
                  <button onClick={() => handleEdit(topic)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(topic.id)} className="btn btn-sm" style={{ padding: '6px', background: 'var(--accent-50)', color: 'var(--accent-600)', border: '1px solid var(--accent-200)' }}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {topics.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--gray-500)' }}>
                  Your queue is empty. Add a topic above or run the seeder script!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
