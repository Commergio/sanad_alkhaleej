"use client";

import { useState } from "react";
import { customers, customerTypeLabels } from "@/data/mock";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { CustomerType } from "@/types";

const typeVariant: Record<CustomerType, "info" | "success" | "warning" | "default"> = {
  doctor: "info",
  clinic: "success",
  center: "warning",
  hospital: "default",
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = customers.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !c.name.toLowerCase().includes(q) &&
        !c.city.toLowerCase().includes(q) &&
        !c.phone.includes(q)
      )
        return false;
    }
    if (typeFilter && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">العملاء</h1>
        <p className="text-slate-500 mt-1">{filtered.length} عميل</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="بحث بالاسم، المدينة، الجوال..."
            className="flex-1"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">جميع الأنواع</option>
            {Object.entries(customerTypeLabels).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-xs">
                <th className="text-right p-4 font-medium">الاسم</th>
                <th className="text-right p-4 font-medium">النوع</th>
                <th className="text-right p-4 font-medium">الجوال</th>
                <th className="text-right p-4 font-medium">المدينة</th>
                <th className="text-right p-4 font-medium">عدد الطلبات</th>
                <th className="text-right p-4 font-medium">آخر طلب</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-800">{c.name}</td>
                  <td className="p-4">
                    <Badge variant={typeVariant[c.type]}>
                      {customerTypeLabels[c.type]}
                    </Badge>
                  </td>
                  <td className="p-4" dir="ltr">{c.phone}</td>
                  <td className="p-4 text-slate-600">{c.city}</td>
                  <td className="p-4 font-medium text-sky-600">{c.orderCount}</td>
                  <td className="p-4 text-slate-500 text-xs">
                    {formatDate(c.lastOrderDate)}
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
