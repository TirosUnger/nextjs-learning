import { db } from '@/lib/db.js';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import ThumbUpButton from './thumb-up';

type BlogDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { id } = await params;

  let blog = null;
  let error = '';

  try {
    // 根据 id 查询博客
    const result = await db.select().from(blogs).where(eq(blogs.id, id));
    blog = result[0] || null;
  } catch (err) {
    error = err instanceof Error ? err.message : '加载博客失败';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 mb-6">
            {error}
          </div>
          <Link href="/blog" className="text-gray-300 hover:text-gray-100 transition">
            ← 返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-300 mb-4">博客不存在</h1>
          <Link href="/blog" className="text-gray-300 hover:text-gray-100 transition">
            ← 返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
      <Link href="/blog" className="text-gray-300 hover:text-gray-100 transition mb-6 inline-block">
        ← 返回博客列表
      </Link>

      <article className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
            {blog.title}
          </h1>
          <Link
            href={`/blog/${id}/edit`}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-1 px-4 rounded transition text-sm"
          >
            编辑
          </Link>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
          <span>
            更新于 {blog.updatedAt
              ? new Date(blog.updatedAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </span>
          <span>👍 {blog.thumbup} 个赞</span>
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <ThumbUpButton id={id} />
        </div>
      </article>
      </div>
    </div>
  );
}
