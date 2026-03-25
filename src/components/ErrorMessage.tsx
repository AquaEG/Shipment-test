type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-soft">
    <p className="font-semibold text-rose-900">Tracking request failed</p>
    <p className="mt-1">{message}</p>
  </div>
);
