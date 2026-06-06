const DATE_LOCALE = 'ru-RU';

export function formatDate(value: string | number | Date): string {
  return new Date(value).toLocaleDateString(DATE_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(value: string | number | Date): string {
  return new Date(value).toLocaleString(DATE_LOCALE, {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}
