import { cn } from '../../lib/utils';

type StatusBadgeProps = {
  label: string;
  tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
};

const toneClasses: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
  error: 'border-rose-400/20 bg-rose-400/10 text-rose-200',
  info: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  neutral: 'border-white/10 bg-white/5 text-slate-300',
};

export const StatusBadge = ({ label, tone = 'neutral' }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]',
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
};
