"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, productStatusLabels } from "@/data/mock";
import { categories } from "@/data/categories";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { ProductStatus } from "@/types";

const statusVariant: Record<ProductStatus, "success" | "warning" | "danger"> = {
  available: "success",
  low_stock: "warning",
  unavailable: "danger",
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.sku.toLowerCase().includes(q) &&
          !p.manufacturer.toLowerCase().includes(q)
        )
          return false;
      }
      if (categoryFilter && p.categoryId !== categoryFilter) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      return true;
    });
  }, [search, categoryFilter, statusFilter]);

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || id;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">إدارة المنتجات</h1>
          <p className="text-slate-500 mt-1">{filtered.length} منتج</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4" />
            إضافة منتج
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="بحث بالاسم، SKU، الشركة..."
            className="flex-1"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">جميع الأقسام</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">جميع الحالات</option>
            <option value="available">متوفر</option>
            <option value="low_stock">مخزون منخفض</option>
            <option value="unavailable">غير متوفر</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-xs">
                <th className="text-right p-4 font-medium">المنتج</th>
                <th className="text-right p-4 font-medium">SKU</th>
                <th className="text-right p-4 font-medium">Barcode</th>
                <th className="text-right p-4 font-medium">القسم</th>
                <th className="text-right p-4 font-medium">الشركة</th>
                <th className="text-right p-4 font-medium">السعر</th>
                <th className="text-right p-4 font-medium">الكمية</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-center p-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((p) => (
                <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-800 max-w-[200px] truncate">
                    {p.name}
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="p-4 font-mono text-xs text-slate-500">{p.barcode}</td>
                  <td className="p-4 text-slate-600">{getCategoryName(p.categoryId)}</td>
                  <td className="p-4 text-slate-600">{p.manufacturer}</td>
                  <td className="p-4 font-medium">{formatPrice(p.price)}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">
                    <Badge variant={statusVariant[p.status]}>
                      {productStatusLabels[p.status]}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-sky-50 text-sky-600"
                        onClick={() => showToast("عرض المنتج (Demo)", "info")}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600"
                        onClick={() => showToast("تعديل المنتج (Demo)", "info")}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                        onClick={() => showToast("تم حذف المنتج (Demo)", "warning")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 50 && (
          <div className="p-4 text-center text-sm text-slate-500 border-t border-slate-100">
            عرض 50 من {filtered.length} منتج
          </div>
        )}
      </div>
    </div>
  );
}
