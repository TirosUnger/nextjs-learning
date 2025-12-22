'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface Session {
  user: User;
  session: {
    token: string;
    expiresAt: number;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Getting session...');
        const sessionData = await authClient.getSession();
        console.log('Raw session data:', sessionData);
        
        if (!sessionData) {
          console.log('No session data returned');
          router.push('/auth/login');
          return;
        }

        // better-auth 返回不同的格式，可能是 { data: {...} } 或直接 {...}
        let parsedSession: Session | null = null;
        
        if (typeof sessionData === 'object') {
          if ('data' in sessionData && sessionData.data && typeof sessionData.data === 'object') {
            if ('user' in sessionData.data) {
              parsedSession = sessionData.data as Session;
            }
          } else if ('user' in sessionData) {
            parsedSession = sessionData as Session;
          }
        }

        if (parsedSession && parsedSession.user) {
          console.log('Session found, user:', parsedSession.user.email);
          setSession(parsedSession);
        } else {
          console.log('Invalid session structure');
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('Failed to get session:', err);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setError('');

    try {
      await authClient.signOut();
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '退出登录失败');
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-blue-500 animate-spin mx-auto"></div>
          <p className="text-gray-300">加载中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            个人中心
          </h1>
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 transition text-sm"
          >
            返回博客
          </Link>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">
                {user.name?.[0] || user.email?.[0] || '?'}
              </span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              {user.name || '用户'}
            </h2>
            <p className="text-gray-300">欢迎使用我们的平台</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                邮箱地址
              </p>
              <p className="text-lg text-white break-all">{user.email}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                用户 ID
              </p>
              <p className="text-sm text-gray-300 font-mono break-all">{user.id}</p>
            </div>

            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                登录状态
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-white">已登录</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            {loggingOut ? '退出中...' : '退出登录'}
          </button>

          <Link
            href="/blog/new"
            className="w-full text-center py-3 px-4 rounded-lg border border-white/20 text-gray-200 hover:bg-white/5 hover:border-white/30 transition duration-300 block"
          >
            创建新博客
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-400 text-xs">
          <p>© 2025 Professional Blog Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
