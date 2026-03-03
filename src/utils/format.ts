export function formatMonthYear(value: string): string {
  const [year, month] = value.split('-').map(Number);
  if (!year || !month) return value;

  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function sumHours(hours: number[]): number {
  return hours.reduce((acc, value) => acc + value, 0);
}
