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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100">
            博客列表
          </h1>
          <Link
            href="/blog/new"
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            + 新建博客
          </Link>
        </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg mb-6">
          {error}
        </div>
      )}

      {blogPosts.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg">暂无博客文章</p>
          <Link href="/blog/new" className="text-gray-300 hover:text-white transition mt-2 inline-block">
            点击创建第一篇博客
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/20 hover:border-white/30 transition"
            >
              <div className="flex justify-between items-start mb-2">
                <h2>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-2xl font-semibold text-gray-300 hover:text-gray-100 hover:underline transition"
                  >
                    {post.title}
                  </Link>
                </h2>
                <span className="text-sm text-gray-400">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString('zh-CN')
                    : ''}
                </span>
              </div>

              <p className="text-gray-400 line-clamp-3 mb-3">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>👍 {post.thumbup} 个赞</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-gray-300 hover:text-gray-100 transition"
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
    </div>
  );
}
