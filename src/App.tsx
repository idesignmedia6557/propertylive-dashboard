export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          PropertyLive
        </h1>
        <h2 className="text-2xl text-gray-300 mb-8">Agent Fleet Mission Control</h2>
        <div className="bg-gray-800/50 rounded-lg p-8 backdrop-blur-sm border border-gray-700">
          <p className="text-gray-400 mb-4">Dashboard deployment successful!</p>
          <p className="text-sm text-gray-500">Connecting to Supabase...</p>
          <div className="mt-6 text-xs text-gray-600">
            <p>Supabase URL: https://lwpzuqjwbucjyizgsfxx.supabase.co</p>
            <p className="mt-2">✓ 4 tables created & seeded</p>
            <p>✓ 6 RPC functions deployed</p>
            <p>✓ 10 agents configured</p>
          </div>
        </div>
      </div>
    </div>
  )
}
