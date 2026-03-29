export type NavigationItem = {
  path: string;
  label: string;
  shortLabel: string;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    shortLabel: 'Home',
    description: 'Operations overview, sync health, and executive metrics.',
  },
  {
    path: '/assistant',
    label: 'AI Assistant',
    shortLabel: 'Assistant',
    description: 'Chat-based orchestration for email, calendar, and sheets.',
  },
  {
    path: '/email',
    label: 'Email',
    shortLabel: 'Email',
    description: 'Inbox triage, escalations, and automated follow-ups.',
  },
  {
    path: '/calendar',
    label: 'Calendar',
    shortLabel: 'Calendar',
    description: 'Scheduling load, priorities, and meeting automation.',
  },
  {
    path: '/sheets',
    label: 'Sheets',
    shortLabel: 'Sheets',
    description: 'Pipeline syncs, sheet outputs, and structured updates.',
  },
  {
    path: '/activity',
    label: 'Activity Log',
    shortLabel: 'Activity',
    description: 'Recent runs, retries, webhook events, and changes.',
  },
  {
    path: '/settings',
    label: 'Settings',
    shortLabel: 'Settings',
    description: 'Integration health, environment setup, and future auth.',
  },
];

export const getPageMeta = (pathname: string) => {
  if (pathname === '/') {
    return navigationItems[0];
  }

  return navigationItems.find((item) => item.path === pathname) ?? navigationItems[0];
};
