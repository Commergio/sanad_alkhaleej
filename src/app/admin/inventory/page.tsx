"use client";

import { useState } from "react";
import { products, productStatusLabels } from "@/data/mock";
import { categories } from "@/data/categories";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";
import { ProductStatus } from "@/types";

const statusVariant: Record<ProductStatus, "success" | "warning" | "danger"> = {
  available: "success",
  low_stock: "warning",
  unavailable: "danger",
};

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [showLowOnly, setShowLowOnly] = useState(false);

  const filtered = products
    .filter((p) => {
      if (showLowOnly && p.stock >= 15 && p.status !== "low_stock") return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => a.stock - b.stock);

  const lowCount = products.filter(
    (p) => p.stock < 15 || p.status === "low_stock"
  ).length;

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || id;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">المخزون</h1>
          <p className="text-slate-500 mt-1">متابعة مستويات المخزون</p>
        </div>
        {lowCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-sm">
            <AlertTriangle className="w-4 h-4" />
            {lowCount} منتج منخفض المخزون
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="بحث بالاسم أو SKU..."
            className="flex-1"
          />
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showLowOnly}
              onChange={(e) => setShowLowOnly(e.target.checked)}
              className="rounded"
            />
            منخفض المخزون فقط
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-xs">
                <th className="text-right p-4 font-medium">المنتج</th>
                <th className="text-right p-4 font-medium">SKU</th>
                <th className="text-right p-4 font-medium">القسم</th>
                <th className="text-right p-4 font-medium">الكمية</th>
                <th className="text-right p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((p) => (
                <tr
                  key={p.id}
                  className={`border-t border-slate-50 ${
                    p.stock < 15 ? "bg-amber-50/30" : ""
                  }`}
                >
                  <td className="p-4 font-medium text-slate-800 max-w-[200px] truncate">
                    {p.name}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="p-4 text-slate-600">{getCategoryName(p.categoryId)}</td>
                  <td className="p-4">
                    <span
                      className={`font-bold ${
                        p.stock < 15 ? "text-amber-600" : "text-slate-800"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusVariant[p.status]}>
                      {productStatusLabels[p.status]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
