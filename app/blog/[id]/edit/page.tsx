'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blogNotFound, setBlogNotFound] = useState(false);

  useEffect(() => {
    // 获取参数并加载博客数据
    params.then(async (resolvedParams) => {
      const blogId = resolvedParams.id;
      setId(blogId);

      try {
        const response = await fetch(`/api/blog/${blogId}`);
        if (!response.ok) {
          setBlogNotFound(true);
          return;
        }
        const data = await response.json();

        if (data.errno === 0 && data.data) {
          setTitle(data.data.title);
          setContent(data.data.content);
        } else {
          setBlogNotFound(true);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        setBlogNotFound(true);
      }
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (data.errno === 0) {
        alert('博客更新成功！');
        router.push(`/blog/${id}`);
      } else {
        setError(data.message || '更新失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '发生错误';
      setError(`请求失败: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (blogNotFound) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">博客不存在</h1>
          <Link href="/blog" className="text-blue-500 hover:underline">
            ← 返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">编辑博客</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title 输入框 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            标题
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入博客标题"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        {/* Content textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请输入博客内容"
            rows={10}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* 按钮组 */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? '更新中...' : '更新博客'}
          </button>
          <Link
            href={`/blog/${id}`}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
