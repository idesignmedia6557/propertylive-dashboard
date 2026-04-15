import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Agent {
  id: string;
  label: string;
  model: string;
  mode: string;
  status: string;
  last_run: string | null;
}

export default function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const { data, error } = await supabase
          .from('agents')
          .select('id, label, model, mode, status, last_run')
          .order('label');

        if (error) throw error;
        setAgents(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load agents');
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();

    // Realtime subscription
    const channel = supabase
      .channel('agents-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, () => {
        fetchAgents();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const statusColor = (status: string) => {
    if (status === 'active') return 'text-green-400';
    if (status === 'error') return 'text-red-400';
    if (status === 'ready') return 'text-blue-400';
    return 'text-yellow-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
        <span className="text-gray-400">Connecting to Supabase...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400">
        <p className="font-semibold">Connection Error</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">Agent Fleet</h3>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{agents.length} agents online</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-700">
              <th className="pb-2 pr-4">Agent</th>
              <th className="pb-2 pr-4">Model</th>
              <th className="pb-2 pr-4">Mode</th>
              <th className="pb-2 pr-4">Status</th>
              <th className="pb-2">Last Run</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="py-3 pr-4 text-gray-200 font-medium">{agent.label}</td>
                <td className="py-3 pr-4 text-gray-400 text-xs font-mono">{agent.model}</td>
                <td className="py-3 pr-4 text-gray-400 capitalize">{agent.mode}</td>
                <td className={`py-3 pr-4 font-semibold capitalize ${statusColor(agent.status)}`}>{agent.status}</td>
                <td className="py-3 text-gray-400 text-xs">
                  {agent.last_run ? new Date(agent.last_run).toLocaleString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
