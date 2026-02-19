'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/bookmarks')
      }
    }
    checkUser()
  }, [router, supabase])
  
const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://smart-bookmark-app-inky-nu.vercel.app/auth/callback",
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
  }
};



  return (
    <main className="flex min-h-screen bg-white overflow-x-hidden relative">
      {/* Animated background with vibrant colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400 via-orange-400 to-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Left Side - Features */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-12 py-16 relative z-10">
        <div className="max-w-lg">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl mb-8 shadow-2xl animate-pulse" style={{animationDuration: '2s'}}>
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
              Smart Bookmarks
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Save, organize, and manage all your favorite bookmarks in one beautiful place
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1 - Quick Save */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-cyan-200/50 hover:border-cyan-400 hover:scale-105 duration-300 group cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/50 group-hover:shadow-lg transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Quick Save</h3>
                  <p className="text-xs text-gray-600">Add bookmarks instantly</p>
                </div>
              </div>
            </div>

            {/* Card 2 - Easy Management */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-orange-200/50 hover:border-orange-400 hover:scale-105 duration-300 group cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-400/50 group-hover:shadow-lg transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Easy Delete</h3>
                  <p className="text-xs text-gray-600">Remove with one click</p>
                </div>
              </div>
            </div>

            {/* Card 3 - Real-time Sync */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-pink-200/50 hover:border-pink-400 hover:scale-105 duration-300 group cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-pink-400/50 group-hover:shadow-lg transition-all animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Real-time Sync</h3>
                  <p className="text-xs text-gray-600">Updates across all tabs</p>
                </div>
              </div>
            </div>

            {/* Card 4 - Privacy */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all border border-green-200/50 hover:border-green-400 hover:scale-105 duration-300 group cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/50 group-hover:shadow-lg transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Privacy First</h3>
                  <p className="text-xs text-gray-600">Secure & private</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-sm">
          {/* Mobile Title - shown only on small screens */}
          <div className="mb-12 lg:mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl mb-8 shadow-2xl animate-pulse" style={{animationDuration: '2s'}}>
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Smart Bookmarks
            </h1>
            <p className="text-gray-700 text-lg font-medium">Save and organize your bookmarks</p>
          </div>

          {/* Sign In Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">Welcome</h2>
            <p className="text-gray-600 mb-10 font-medium">Sign in to start managing your bookmarks</p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 rounded-xl px-6 py-4 font-semibold hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 border-2 border-cyan-300/60 rounded-2xl p-5 text-center mt-8">
              <p className="text-sm font-semibold bg-gradient-to-r from-cyan-700 to-purple-700 bg-clip-text text-transparent">
                One-click sign-in with your Google account
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8 font-medium">
            We respect your privacy. No tracking, no ads.
          </p>
        </div>
      </div>
    </main>
  )
}