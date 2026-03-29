import type { PropsWithChildren, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type GlassPanelProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  header?: ReactNode;
}>;

export const GlassPanel = ({ children, className, contentClassName, header }: GlassPanelProps) => {
  return (
    <section className={cn('glass-panel panel-hairline overflow-hidden', className)}>
      {header}
      <div className={cn('p-5 sm:p-6', contentClassName)}>{children}</div>
    </section>
  );
};
