import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('🔍 Callback URL:', request.url);
  console.log('🔍 Code present:', !!code);

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to bookmarks page
  return NextResponse.redirect(new URL('/bookmarks', request.url))
}