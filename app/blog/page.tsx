import { db } from '@/lib/db.js';
import { blogs } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import DeleteBlogButton from './components/delete-blog-button';

export default async function BlogPage() {
  let blogPosts = [];
  let error = '';

  try {
    // 查询数据库，按 createdAt 逆序排序
    blogPosts = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt));
  } catch (err) {
    error = err instanceof Error ? err.message : '加载博客列表失败';
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">博客列表</h1>
        <Link
          href="/blog/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          + 新建博客
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {blogPosts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">暂无博客文章</p>
          <Link href="/blog/new" className="text-blue-500 hover:underline mt-2 inline-block">
            点击创建第一篇博客
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h2>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-2xl font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <span className="text-sm text-gray-500">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString('zh-CN')
                    : ''}
                </span>
              </div>

              <p className="text-gray-700 line-clamp-3 mb-3">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>👍 {post.thumbup} 个赞</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    阅读全文 →
                  </Link>
                </div>
                <DeleteBlogButton id={post.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
