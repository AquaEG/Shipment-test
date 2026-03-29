import type { DashboardStat } from '../../types';
import { GlassPanel } from './GlassPanel';

type StatCardProps = {
  stat: DashboardStat;
};

const trendTone: Record<DashboardStat['direction'], string> = {
  up: 'text-emerald-300',
  down: 'text-rose-300',
  steady: 'text-cyan-200',
};

export const StatCard = ({ stat }: StatCardProps) => {
  return (
    <GlassPanel className="h-full">
      <p className="surface-label">{stat.label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="text-3xl font-semibold text-white">{stat.value}</p>
        <p className={`text-sm font-semibold ${trendTone[stat.direction]}`}>{stat.change}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{stat.detail}</p>
    </GlassPanel>
  );
};
