'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('确定要删除这篇博客吗？此操作不可撤销。')) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.errno === 0) {
        alert('博客已删除');
        router.push('/blog');
        router.refresh();
      } else {
        alert(`删除失败: ${data.message}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '请求失败';
      alert(`删除失败: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium py-1 px-4 rounded transition text-sm"
    >
      {loading ? '删除中...' : '删除'}
    </button>
  );
}
