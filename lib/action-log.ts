export type ActionLogType = 'listing_draft_created' | 'booking_created' | 'user_created' | 'host_created';

export type ActionLog = {
  id: string;
  type: ActionLogType;
  message: string;
  createdAtIso: string;
};

const STORAGE_KEY = 'couchify_action_logs_v1';

function canUseStorage() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

export function readActionLogs(): ActionLog[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActionLog[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendActionLog(type: ActionLogType, message: string): ActionLog {
  const nextLog: ActionLog = {
    id: `log_${Date.now()}`,
    type,
    message,
    createdAtIso: new Date().toISOString()
  };

  if (!canUseStorage()) return nextLog;

  const existing = readActionLogs();
  const updated = [nextLog, ...existing].slice(0, 20);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return nextLog;
}
