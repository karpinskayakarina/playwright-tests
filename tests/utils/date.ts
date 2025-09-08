export function plus3MonthsMMYYYY(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${mm}/${yyyy}`;
}
