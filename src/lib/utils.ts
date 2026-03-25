export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const formatLabel = (value?: string) => value || 'Not available';

export const formatDateTime = (value?: string) => {
  if (!value) return 'Not available';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: value.includes(':') ? 'short' : undefined,
  }).format(parsed);
};

export const capitalizeWords = (value: string) =>
  value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const getInitials = (value?: string) => {
  if (!value) return 'MM';

  const parts = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!parts.length) return 'MM';

  return parts.map((part) => part.charAt(0).toUpperCase()).join('');
};
