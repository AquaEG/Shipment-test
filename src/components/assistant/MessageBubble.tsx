import type { AssistantMessage } from '../../types';
import { cn } from '../../lib/utils';

type MessageBubbleProps = {
  message: AssistantMessage;
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-[24px] px-4 py-3 shadow-soft sm:max-w-[72%]',
          isUser && 'bg-gradient-to-r from-brand-500 to-cyanGlow text-slate-950',
          !isUser &&
            !isSystem &&
            'border border-white/10 bg-white/[0.055] text-slate-100 backdrop-blur-xl',
          isSystem && 'border border-rose-400/20 bg-rose-400/10 text-rose-100',
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={cn('text-[11px] uppercase tracking-[0.22em]', isUser ? 'text-slate-950/70' : 'text-slate-400')}>
            {message.timestamp}
          </span>
          {message.meta?.map((item) => (
            <span
              key={item}
              className={cn(
                'rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]',
                isUser
                  ? 'border-slate-900/10 bg-slate-950/10 text-slate-950/70'
                  : 'border-white/10 bg-white/5 text-slate-300',
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
