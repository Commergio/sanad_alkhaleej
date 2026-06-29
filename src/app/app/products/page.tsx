"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProductCard } from "@/components/customer/ProductCard";
import { Select } from "@/components/ui/Select";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { products, manufacturersList } from "@/data/mock";
import { categories } from "@/data/categories";
import {
  filterProducts,
  defaultFilters,
  ProductFilters,
  getUniqueSpecValues,
} from "@/lib/filters";
import { Package, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    ...defaultFilters,
    category: searchParams.get("category") || "",
    search: searchParams.get("q") || "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      category: searchParams.get("category") || "",
      search: searchParams.get("q") || f.search,
    }));
  }, [searchParams]);

  const categoryProducts = useMemo(() => {
    const base = filters.category
      ? products.filter((p) => p.categoryId === filters.category)
      : products;
    return base;
  }, [filters.category]);

  const filtered = useMemo(
    () => filterProducts(categoryProducts, filters),
    [categoryProducts, filters]
  );

  const gauges = getUniqueSpecValues(
    categoryProducts.filter((p) => p.categoryId === "needles"),
    "gauge"
  );
  const types = getUniqueSpecValues(categoryProducts, "type");
  const sizes = getUniqueSpecValues(categoryProducts, "size");

  const categoryName = categories.find((c) => c.id === filters.category)?.name;

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v && k !== "search"
  ).length;

  const clearFilters = () => {
    setFilters({ ...defaultFilters, category: filters.category });
  };

  if (loading) return <LoadingState />;

  return (
    <div className="animate-fade-in">
      <div className="p-4 space-y-3 sticky top-0 bg-white z-30 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {categoryName || "جميع المنتجات"}
            </h1>
            <p className="text-xs text-slate-500">{filtered.length} منتج</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            فلاتر
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -left-1 w-4 h-4 bg-sky-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <SearchBar
          value={filters.search}
          onChange={(v) => setFilters((f) => ({ ...f, search: v }))}
          placeholder="بحث بالاسم، SKU، الشركة..."
        />

        {showFilters && (
          <div className="p-4 rounded-2xl bg-slate-50 space-y-3 animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">الفلاتر</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  مسح الكل
                </button>
              )}
            </div>

            {!filters.category && (
              <Select
                label="القسم"
                value={filters.category}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, category: e.target.value }))
                }
                options={[
                  { value: "", label: "جميع الأقسام" },
                  ...categories.map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
            )}

            <Select
              label="الشركة المصنعة"
              value={filters.manufacturer}
              onChange={(e) =>
                setFilters((f) => ({ ...f, manufacturer: e.target.value }))
              }
              options={[
                { value: "", label: "الكل" },
                ...manufacturersList.map((m) => ({ value: m, label: m })),
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="السعر من"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minPrice: e.target.value }))
                }
                options={[
                  { value: "", label: "—" },
                  { value: "50", label: "50 ر.س" },
                  { value: "100", label: "100 ر.س" },
                  { value: "200", label: "200 ر.س" },
                  { value: "500", label: "500 ر.س" },
                ]}
              />
              <Select
                label="السعر إلى"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, maxPrice: e.target.value }))
                }
                options={[
                  { value: "", label: "—" },
                  { value: "100", label: "100 ر.س" },
                  { value: "200", label: "200 ر.س" },
                  { value: "500", label: "500 ر.س" },
                  { value: "1000", label: "1000 ر.س" },
                  { value: "5000", label: "5000 ر.س" },
                ]}
              />
            </div>

            <Select
              label="التوفر"
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value }))
              }
              options={[
                { value: "", label: "الكل" },
                { value: "available", label: "متوفر" },
                { value: "low_stock", label: "مخزون منخفض" },
                { value: "unavailable", label: "غير متوفر" },
              ]}
            />

            {types.length > 0 && (
              <Select
                label="النوع"
                value={filters.type}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, type: e.target.value }))
                }
                options={[
                  { value: "", label: "الكل" },
                  ...types.map((t) => ({ value: t, label: t })),
                ]}
              />
            )}

            {sizes.length > 0 && (
              <Select
                label="المقاس"
                value={filters.size}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, size: e.target.value }))
                }
                options={[
                  { value: "", label: "الكل" },
                  ...sizes.map((s) => ({ value: s, label: s })),
                ]}
              />
            )}

            {gauges.length > 0 && (
              <Select
                label="Gauge (مقاس الإبرة)"
                value={filters.gauge}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, gauge: e.target.value }))
                }
                options={[
                  { value: "", label: "الكل" },
                  ...gauges.map((g) => ({ value: g, label: `Gauge ${g}` })),
                ]}
              />
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Package}
            title="لا توجد منتجات"
            description="جرب تغيير معايير البحث أو الفلاتر"
            action={
              <Button variant="outline" size="sm" onClick={clearFilters}>
                مسح الفلاتر
              </Button>
            }
          />
        ) : (
          filtered.map((p) => <ProductCard key={p.id} product={p} compact />)
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsContent />
    </Suspense>
  );
}
