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
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← 返回博客列表
        </Link>
      </div>
    );
  }

  if (!blog) {
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
      <Link href="/blog" className="text-blue-500 hover:underline mb-6 inline-block">
        ← 返回博客列表
      </Link>

      <article className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <Link
            href={`/blog/${id}/edit`}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded transition text-sm"
          >
            编辑
          </Link>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6 pb-6 border-b">
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

        <div className="prose max-w-none mb-8">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>

        <div className="border-t pt-6">
          <ThumbUpButton id={id} />
        </div>
      </article>
    </div>
  );
}
