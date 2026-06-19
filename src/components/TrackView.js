'use client';

import { useEffect } from 'react';

export default function TrackView({ type, id, name }) {
  useEffect(() => {
    // Fire and forget
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, name })
    }).catch(() => {});
  }, [type, id, name]);

  return null;
}
