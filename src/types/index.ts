export type TrendDirection = 'up' | 'down' | 'steady';

export type DashboardStat = {
  label: string;
  value: string;
  change: string;
  direction: TrendDirection;
  detail: string;
};

export type FocusItem = {
  title: string;
  detail: string;
  eta: string;
  owner: string;
  tone: 'cyan' | 'violet' | 'blue';
};

export type EmailThread = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  tag: string;
  state: 'Needs Reply' | 'Draft Ready' | 'Automated' | 'Waiting';
};

export type CalendarEvent = {
  id: string;
  title: string;
  owner: string;
  start: string;
  end: string;
  type: 'Focus' | 'Meeting' | 'Prep' | 'Hold';
  location: string;
};

export type SheetSync = {
  id: string;
  name: string;
  tab: string;
  syncedAt: string;
  rows: string;
  state: 'Healthy' | 'Warning' | 'Queued';
};

export type ActivityEntry = {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: 'Completed' | 'Retried' | 'Failed' | 'Queued';
  source: string;
};

export type IntegrationCard = {
  id: string;
  name: string;
  description: string;
  status: 'Connected' | 'Needs Config' | 'Planned';
  detail: string;
};

export type AssistantSuggestion = {
  id: string;
  label: string;
  prompt: string;
};

export type AssistantMessage = {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
  status?: 'complete' | 'error';
  meta?: string[];
};

export type AssistantRequestPayload = {
  message: string;
  conversationId: string;
  channel: 'assistant-dashboard';
  context: {
    integrations: string[];
    currentPage: string;
    workspace: string;
  };
  metadata: {
    sentAt: string;
    timezone: string;
    locale: string;
  };
};

export type AssistantServiceResponse = {
  text: string;
  summary?: string;
  highlights: string[];
  raw: unknown;
};
