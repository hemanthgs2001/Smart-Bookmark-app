import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Bookmarks',
  description: 'Save and organize your bookmarks in real-time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(20px, -20px) rotate(5deg); }
            66% { transform: translate(-20px, 20px) rotate(-5deg); }
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}