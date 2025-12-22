import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-neutral-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 mb-6">
          欢迎来到我的博客
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          这是一个优雅的Next.js博客平台，集成了认证系统和完整的博客功能。
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/blog"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold transition transform hover:scale-105"
          >
            查看博客
          </Link>
          
          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 font-semibold transition"
          >
            登录账户
          </Link>

          <Link
            href="/auth/register"
            className="px-8 py-3 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 font-semibold transition"
          >
            创建账户
          </Link>
        </div>

        <div className="mt-12 text-gray-400 text-sm">
          <p>© 2025 Professional Blog Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
