'use client';

import { useState } from 'react';

export default function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          userId: 'user-1',
        }),
      });

      const data = await response.json();

      if (data.errno === 0) {
        setSuccess(true);
        setTitle('');
        setContent('');
        alert('博客创建成功！');
      } else {
        setError(data.message || '创建失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发生错误';
      setError(`请求失败: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 mb-8">
          创建新博客
        </h1>

        <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              标题
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入博客标题"
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              内容
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入博客内容"
              rows={10}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200">
              博客创建成功！
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? '提交中...' : '提交'}
          </button>
        </form>
      </div>
    </div>
  );
}
