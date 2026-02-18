'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Bookmark } from '@/types/database.types'
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

interface Props {
  userId: string
}

export default function BookmarkList({ userId }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setBookmarks(data || [])
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [supabase, userId])

  useEffect(() => {
    const channel = supabase.channel('bookmarks-channel')
    
    channel
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload: RealtimePostgresChangesPayload<Bookmark>) => {
          const newBookmark = payload.new as Bookmark
          setBookmarks((prev) => {
            if (prev.some(b => b.id === newBookmark.id)) return prev
            return [newBookmark, ...prev]
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const oldRecord = payload.old as { id: string }
          setBookmarks((prev) => prev.filter((b) => b.id !== oldRecord.id))
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [supabase, userId])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)

      if (error) throw error
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch (error) {
      console.error('Error deleting bookmark:', error)
      alert('Failed to delete bookmark')
    } finally {
      setDeletingId(null)
    }
  }

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + '...'
  }

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-lg">Loading your bookmarks...</span>
        </div>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-20 glass rounded-3xl">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold gradient-text mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Add your first bookmark using the form above ✨</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Your Collection
        </h2>
        <span className="glass px-4 py-2 rounded-full text-sm font-medium text-gray-600">
          {bookmarks.length} {bookmarks.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <div className="grid gap-4">
        {bookmarks.map((bookmark) => {
          const favicon = getFaviconUrl(bookmark.url)
          
          return (
            <div
              key={bookmark.id}
              className="group glass rounded-2xl p-5 card-hover border border-white/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 flex items-start gap-3">
                  {favicon && (
                    <div className="w-8 h-8 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <img 
                        src={favicon} 
                        alt="" 
                        className="w-5 h-5"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-lg">{bookmark.title}</h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 group"
                    >
                      <span className="truncate max-w-md">{truncateUrl(bookmark.url)}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Added {new Date(bookmark.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  disabled={deletingId === bookmark.id}
                  className="flex-shrink-0 px-4 py-2 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium border border-red-200/50 shadow-sm hover:shadow"
                >
                  {deletingId === bookmark.id ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}