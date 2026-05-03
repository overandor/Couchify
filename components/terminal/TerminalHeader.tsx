'use client';

import { SessionMetrics } from '@/lib/terminal-types';

interface TerminalHeaderProps {
  metrics: SessionMetrics;
  sandboxStatus: 'active' | 'idle' | 'connecting';
}

export function TerminalHeader({ metrics, sandboxStatus }: TerminalHeaderProps) {
  const statusColors = {
    active: 'bg-terminalSuccess',
    idle: 'bg-terminalGold',
    connecting: 'bg-terminalWarning'
  };

  return (
    <header className="sticky top-0 z-50 border-b border-terminalBorder bg-terminalBg/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-terminalGold/30" />
            <div className="h-3 w-0.5 rounded-full bg-terminalGold" />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terminalGold" />
          </div>
          <span className="font-mono text-sm font-medium tracking-widest text-terminalText">
            COUCHIFY
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${statusColors[sandboxStatus]} animate-pulse`} />
            <span className="font-mono text-[10px] uppercase tracking-wider text-terminalMuted">
              {sandboxStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="flex items-center justify-between border-t border-terminalBorder/50 px-4 py-2">
        <div className="flex gap-4">
          <MetricPill label="EXEC" value={metrics.commandsExecuted} />
          <MetricPill label="OK" value={metrics.commandsApproved} color="success" />
          <MetricPill label="REJ" value={metrics.commandsRejected} color="error" />
        </div>
        <div className="font-mono text-[10px] text-terminalMuted">
          {new Date(metrics.lastActivity).toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
}

function MetricPill({ label, value, color }: { label: string; value: number; color?: 'success' | 'error' }) {
  const valueColor = color === 'success' 
    ? 'text-terminalSuccess' 
    : color === 'error' 
      ? 'text-terminalError' 
      : 'text-terminalGold';

  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-[10px] uppercase tracking-wider text-terminalMuted">{label}</span>
      <span className={`font-mono text-xs font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}
