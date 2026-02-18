import { createClient } from '@/lib/supabase/server'

export default async function TestPage() {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase.auth.getSession()
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Environment Variables:</h2>
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}</p>
          <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Supabase Connection:</h2>
          {error ? (
            <p className="text-red-600">❌ Error: {error.message}</p>
          ) : (
            <p className="text-green-600">✅ Connected successfully!</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Session Data:</h2>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Connection Failed</h1>
        <p className="text-red-600">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    )
  }
}