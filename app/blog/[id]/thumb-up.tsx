'use client';

import { useState } from 'react';

export default function ThumbUpButton({ id }: { id: string }) {
  const [thumbup, setThumbup] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleThumbUp() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/blog/thumb-up/${id}`, {
        method: 'POST',
      });
      const data = await res.json();

      if (data.errno === 0) {
        setThumbup(data.data.thumbup);
      } else {
        setError(data.message || '点赞失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '请求失败';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleThumbUp}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition flex items-center gap-2"
      >
        👍 {loading ? '点赞中...' : '点赞'}
      </button>
      <span className="text-lg font-semibold text-gray-700">{thumbup}</span>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
