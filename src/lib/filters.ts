import { Product } from "@/types";

export interface ProductFilters {
  search: string;
  category: string;
  manufacturer: string;
  minPrice: string;
  maxPrice: string;
  status: string;
  type: string;
  size: string;
  gauge: string;
}

export const defaultFilters: ProductFilters = {
  search: "",
  category: "",
  manufacturer: "",
  minPrice: "",
  maxPrice: "",
  status: "",
  type: "",
  size: "",
  gauge: "",
};

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.manufacturer.toLowerCase().includes(q) ||
        p.barcode.includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (filters.category && p.categoryId !== filters.category) return false;
    if (filters.manufacturer && p.manufacturer !== filters.manufacturer)
      return false;
    if (filters.minPrice && p.price < parseFloat(filters.minPrice))
      return false;
    if (filters.maxPrice && p.price > parseFloat(filters.maxPrice))
      return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.type && p.specs.type !== filters.type) return false;
    if (filters.size && p.specs.size !== filters.size) return false;
    if (filters.gauge && p.specs.gauge !== filters.gauge) return false;
    return true;
  });
}

export function getUniqueSpecValues(
  products: Product[],
  key: string
): string[] {
  const values = new Set<string>();
  products.forEach((p) => {
    const val = p.specs[key];
    if (val !== undefined) values.add(String(val));
  });
  return Array.from(values).sort();
}
