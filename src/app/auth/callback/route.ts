import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('=== AUTH CALLBACK HIT ===')
  console.log('Time:', new Date().toISOString())
  
  const requestUrl = new URL(request.url)
  console.log('Full callback URL:', request.url)
  console.log('URL parts:', {
    origin: requestUrl.origin,
    pathname: requestUrl.pathname,
    search: requestUrl.search,
  })
  
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')
  
  console.log('Query params:', {
    code: code ? 'PRESENT' : 'MISSING',
    error,
    errorDescription,
  })
  
  // Check for OAuth errors
  if (error) {
    console.error('OAuth error returned:', { error, errorDescription })
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url))
  }

  if (code) {
    try {
      console.log('Exchanging code for session...')
      const supabase = await createClient()
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError)
        return NextResponse.redirect(new URL(`/?error=exchange_failed`, request.url))
      }
      
      console.log('Code exchange successful!')
    } catch (err) {
      console.error('Unexpected error in callback:', err)
      return NextResponse.redirect(new URL('/?error=unexpected', request.url))
    }
  } else {
    console.log('No code present in callback URL')
  }

  console.log('Redirecting to /bookmarks')
  return NextResponse.redirect(new URL('/bookmarks', request.url))
}