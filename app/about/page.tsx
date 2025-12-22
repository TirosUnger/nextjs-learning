import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-gray-300 hover:text-gray-100 transition">
            ← 返回首页
          </Link>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 mb-6">
            关于本站
          </h1>

          <div className="space-y-6 text-gray-300">
            <p>
              欢迎来到我的个人博客站点。这是一个现代化的博客平台，使用最新的技术栈构建。
            </p>

            <h2 className="text-2xl font-semibold text-gray-200 mt-8">技术栈</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js 16.0 - 全栈React框架</li>
              <li>TypeScript - 类型安全的JavaScript</li>
              <li>Tailwind CSS - 原子化CSS框架</li>
              <li>Drizzle ORM - 轻量级数据库ORM</li>
              <li>Better Auth - 现代认证方案</li>
              <li>PostgreSQL - 关系数据库</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-200 mt-8">功能特性</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>优雅的深色主题界面</li>
              <li>完整的用户认证系统</li>
              <li>博客内容管理（创建、编辑、删除）</li>
              <li>文章点赞功能</li>
              <li>响应式设计，支持多设备</li>
            </ul>

            <p className="mt-8 text-gray-400 text-sm">
              © 2025 Professional Blog Platform. 所有权利已保留。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}