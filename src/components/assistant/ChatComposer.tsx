import { useState } from 'react';

type ChatComposerProps = {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (value: string) => void;
  onRetry?: () => void;
  hasRetry?: boolean;
};

export const ChatComposer = ({
  disabled = false,
  loading = false,
  onSubmit,
  onRetry,
  hasRetry = false,
}: ChatComposerProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || loading) {
      return;
    }

    onSubmit(trimmed);
    setValue('');
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask the assistant to triage email, reorganize meetings, or sync a sheet update..."
        className="min-h-[120px] w-full resize-none rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-brand-400/40 focus:bg-white/[0.05]"
        disabled={disabled || loading}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Requests are sent through the centralized assistant API service, not directly from the chat UI.
        </p>

        <div className="flex flex-wrap gap-3">
          {hasRetry && onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
            >
              Retry last request
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || loading}
            className="rounded-full bg-gradient-to-r from-brand-500 via-cyanGlow to-violetGlow px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send to assistant'}
          </button>
        </div>
      </div>
    </div>
  );
};
