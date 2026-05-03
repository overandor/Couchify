export type CommandStatus = 'pending' | 'approved' | 'rejected' | 'executing' | 'completed' | 'failed';

export interface TerminalCommand {
  id: string;
  command: string;
  description: string;
  status: CommandStatus;
  output?: string;
  timestamp: string;
  risk: 'safe' | 'moderate' | 'elevated';
}

export interface TerminalMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  proposedCommand?: TerminalCommand;
}

export interface SandboxState {
  cwd: string;
  files: string[];
  env: Record<string, string>;
  history: TerminalCommand[];
}

export interface SessionMetrics {
  commandsExecuted: number;
  commandsApproved: number;
  commandsRejected: number;
  sessionStarted: string;
  lastActivity: string;
}
