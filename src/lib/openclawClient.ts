// OpenClaw API Client for PropertyLive Dashboard
// Communicates with OpenClaw daemon for agent management

interface OpenClawConfig {
  baseUrl: string;
  apiKey?: string;
}

interface AgentStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  lastActivity: string;
}

interface TaskCommand {
  agentId: string;
  task: string;
  parameters?: Record<string, any>;
}

export class OpenClawClient {
  private config: OpenClawConfig;

  constructor(config: OpenClawConfig) {
    this.config = config;
  }

  // Get all agent statuses from OpenClaw
  async getAgentStatuses(): Promise<AgentStatus[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/agents/status`, {
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`OpenClaw API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch agent statuses:', error);
      return [];
    }
  }

  // Send command to specific agent
  async sendCommand(command: TaskCommand): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/agents/${command.agentId}/command`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          task: command.task,
          parameters: command.parameters,
        }),
      });
      
      return response.ok;
    } catch (error) {
      console.error('Failed to send command:', error);
      return false;
    }
  }

  // Get agent logs
  async getAgentLogs(agentId: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/agents/${agentId}/logs`, {
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch agent logs:', error);
      return [];
    }
  }

  // Get OpenClaw system status
  async getSystemStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/system/status`, {
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch system status: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch system status:', error);
      return { status: 'error', message: error };
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }
    
    return headers;
  }
}

// Create default OpenClaw client instance
export const openclawClient = new OpenClawClient({
  baseUrl: import.meta.env.VITE_OPENCLAW_API_URL || 'http://localhost:8080',
  apiKey: import.meta.env.VITE_OPENCLAW_API_KEY,
});
