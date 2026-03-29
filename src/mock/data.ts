import type {
  ActivityEntry,
  AssistantMessage,
  AssistantSuggestion,
  CalendarEvent,
  DashboardStat,
  EmailThread,
  FocusItem,
  IntegrationCard,
  SheetSync,
} from '../types';

export const dashboardStats: DashboardStat[] = [
  {
    label: 'Autonomous tasks today',
    value: '148',
    change: '+18%',
    direction: 'up',
    detail: 'Email triage, scheduling, and sheet updates completed without operator touch.',
  },
  {
    label: 'Inbox SLA',
    value: '11 min',
    change: '-4 min',
    direction: 'up',
    detail: 'Median first response time after assistant-generated drafts were enabled.',
  },
  {
    label: 'Calendar coverage',
    value: '92%',
    change: 'Stable',
    direction: 'steady',
    detail: 'High-priority meetings mapped with prep notes and follow-up tasks.',
  },
  {
    label: 'Sheet sync freshness',
    value: '2m 14s',
    change: '+4 sources',
    direction: 'up',
    detail: 'CRM, hiring tracker, and finance sheets are syncing on the same orchestration layer.',
  },
];

export const focusItems: FocusItem[] = [
  {
    title: 'Exec inbox sweep',
    detail: 'Classify urgent finance threads, draft responses, and push approvals to the afternoon slot.',
    eta: '09:45',
    owner: 'Email agent',
    tone: 'cyan',
  },
  {
    title: 'Board prep scheduler',
    detail: 'Reshuffle prep blocks around two customer calls and keep the CFO brief within the same day.',
    eta: '11:10',
    owner: 'Calendar agent',
    tone: 'violet',
  },
  {
    title: 'Revenue sheet sync',
    detail: 'Merge cleaned pipeline notes into the Q2 sheet and flag rows with missing owners.',
    eta: '12:05',
    owner: 'Sheets agent',
    tone: 'blue',
  },
];

export const inboxThreads: EmailThread[] = [
  {
    id: 'email-1',
    sender: 'Priya Raman',
    subject: 'Renewal pricing questions from Northstar',
    preview: 'Customer is asking for seat expansion and a security review summary before Friday.',
    time: '08:14',
    tag: 'Revenue',
    state: 'Draft Ready',
  },
  {
    id: 'email-2',
    sender: 'Marcus Lee',
    subject: 'Need meeting notes pushed to hiring tracker',
    preview: 'Assistant already summarized the interview and can append next-step scores to the sheet.',
    time: '08:41',
    tag: 'Hiring',
    state: 'Automated',
  },
  {
    id: 'email-3',
    sender: 'Ava Patel',
    subject: 'Vendor payment exception',
    preview: 'Finance needs approval language plus a calendar hold with Ops by noon.',
    time: '09:02',
    tag: 'Finance',
    state: 'Needs Reply',
  },
  {
    id: 'email-4',
    sender: 'Team Inbox',
    subject: 'Weekly leadership digest',
    preview: 'Pending schedule confirmation for one attendee before sending the final digest.',
    time: '09:18',
    tag: 'Operations',
    state: 'Waiting',
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Northstar renewal prep',
    owner: 'Revenue',
    start: '10:00',
    end: '10:30',
    type: 'Prep',
    location: 'Focus room / Notes doc',
  },
  {
    id: 'cal-2',
    title: 'Leadership standup',
    owner: 'Ops',
    start: '11:00',
    end: '11:30',
    type: 'Meeting',
    location: 'Zoom / Shared agenda',
  },
  {
    id: 'cal-3',
    title: 'Deep work block',
    owner: 'Founder',
    start: '13:30',
    end: '15:00',
    type: 'Focus',
    location: 'Protected focus time',
  },
  {
    id: 'cal-4',
    title: 'Vendor escalation buffer',
    owner: 'Finance',
    start: '15:30',
    end: '16:00',
    type: 'Hold',
    location: 'Temporary hold via assistant',
  },
];

export const sheetSyncs: SheetSync[] = [
  {
    id: 'sheet-1',
    name: 'Revenue command center',
    tab: 'Pipeline',
    syncedAt: '2 minutes ago',
    rows: '184 rows',
    state: 'Healthy',
  },
  {
    id: 'sheet-2',
    name: 'Hiring tracker',
    tab: 'Interview notes',
    syncedAt: '9 minutes ago',
    rows: '63 rows',
    state: 'Queued',
  },
  {
    id: 'sheet-3',
    name: 'Ops exception log',
    tab: 'Escalations',
    syncedAt: '17 minutes ago',
    rows: '29 rows',
    state: 'Warning',
  },
];

export const activityEntries: ActivityEntry[] = [
  {
    id: 'act-1',
    title: 'Drafted renewal response',
    detail: 'Prepared a customer-ready email with updated pricing notes and attached the latest security FAQ.',
    time: '09:16',
    status: 'Completed',
    source: 'Email workflow',
  },
  {
    id: 'act-2',
    title: 'Retried calendar hold creation',
    detail: 'Second attempt succeeded after transient webhook timeout; conflict-free slot reserved for finance review.',
    time: '08:58',
    status: 'Retried',
    source: 'Calendar workflow',
  },
  {
    id: 'act-3',
    title: 'Sheet sync validation failed',
    detail: 'Two records were missing account owners, so the assistant paused the write and surfaced a review task.',
    time: '08:47',
    status: 'Failed',
    source: 'Sheets workflow',
  },
  {
    id: 'act-4',
    title: 'Queued inbox digest',
    detail: 'Leadership summary will be generated after the final attendee confirms today’s 11:00 meeting.',
    time: '08:24',
    status: 'Queued',
    source: 'Digest workflow',
  },
];

export const integrationCards: IntegrationCard[] = [
  {
    id: 'int-1',
    name: 'Email',
    description: 'Triages inbound mail, drafts responses, and ships summaries.',
    status: 'Connected',
    detail: 'Gmail labels, summaries, and send/draft actions are ready for webhook orchestration.',
  },
  {
    id: 'int-2',
    name: 'Calendar',
    description: 'Schedules meetings, protects focus blocks, and resolves conflicts.',
    status: 'Connected',
    detail: 'Calendar events and scheduling context are exposed to the chat workflow payload.',
  },
  {
    id: 'int-3',
    name: 'Sheets',
    description: 'Reads structured trackers and writes cleaned operational updates.',
    status: 'Connected',
    detail: 'Sheet sync jobs, row counts, and retry-ready writes are mocked into the dashboard flows.',
  },
  {
    id: 'int-4',
    name: 'Webhook auth',
    description: 'Reserved for future auth headers and secret rotation.',
    status: 'Planned',
    detail: 'The API service already supports extending headers without coupling them to the chat UI.',
  },
];

export const assistantSuggestions: AssistantSuggestion[] = [
  {
    id: 'prompt-1',
    label: 'Triage the inbox',
    prompt: 'Review urgent inbox items, draft the top 3 responses, and summarize anything blocking action.',
  },
  {
    id: 'prompt-2',
    label: 'Rebuild today’s calendar',
    prompt: 'Protect two hours of focus time this afternoon and move low-priority meetings around it.',
  },
  {
    id: 'prompt-3',
    label: 'Sync finance sheet',
    prompt: 'Update the finance sheet with latest vendor escalations and flag rows missing approval owners.',
  },
];

export const assistantIntroMessages: AssistantMessage[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content:
      'I can coordinate email, calendar, and sheets through a single webhook call. Ask me to draft replies, reorganize your schedule, or sync structured updates into your trackers.',
    timestamp: '09:20',
    status: 'complete',
    meta: ['Webhook-ready', 'n8n orchestration', 'Centralized API service'],
  },
];
