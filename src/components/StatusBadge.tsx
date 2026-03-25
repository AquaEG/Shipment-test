import { cn } from '../lib/utils';

type StatusBadgeProps = {
  status: string;
};

const statusTheme = (status: string) => {
  const value = status.toLowerCase();

  if (value.includes('deliver')) {
    return 'bg-emerald-500/15 text-emerald-700 ring-emerald-500/20';
  }

  if (value.includes('transit') || value.includes('route')) {
    return 'bg-sky-500/15 text-sky-700 ring-sky-500/20';
  }

  if (value.includes('out for delivery')) {
    return 'bg-amber-500/15 text-amber-700 ring-amber-500/20';
  }

  if (value.includes('exception') || value.includes('failed')) {
    return 'bg-rose-500/15 text-rose-700 ring-rose-500/20';
  }

  return 'bg-slate-500/15 text-slate-700 ring-slate-500/20';
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-inset animate-pulse-soft',
      statusTheme(status),
    )}
  >
    <span className="h-2 w-2 rounded-full bg-current opacity-80" />
    {status}
  </span>
);
