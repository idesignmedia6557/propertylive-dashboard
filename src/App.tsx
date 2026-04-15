import AgentList from './components/AgentList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            PropertyLive
          </h1>
          <h2 className="text-2xl text-gray-300">Agent Fleet Mission Control</h2>
        </div>

        {/* Agent List Panel */}
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
          <AgentList />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>Connected to Supabase · {new Date().getFullYear()} PropertyLive</p>
        </div>
      </div>
    </div>
  );
}
