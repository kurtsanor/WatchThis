export function formatRuntime(minutes: number) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}

export function getYear(year: string) {
  return year.split("-")[0];
}

export function formatDecimal(input: number) {
  return input.toFixed(1);
}
