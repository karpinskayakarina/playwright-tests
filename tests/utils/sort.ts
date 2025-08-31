import { SortOrder } from "../enums/sorting";

const collator = new Intl.Collator("en", { sensitivity: "base" });

export function sortByName(
  values: readonly string[],
  order: SortOrder
): string[] {
  const sorted = [...values].sort((a, b) => collator.compare(a, b));
  return order === SortOrder.Ascending ? sorted : sorted.reverse();
}

export const parsePrice = (s: string): number =>
  Number(s.replace(/[^\d,.-]+/g, "").replace(",", "."));

export function sortPrices(
  values: readonly number[],
  order: SortOrder
): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  return order === SortOrder.Ascending ? sorted : sorted.reverse();
}
