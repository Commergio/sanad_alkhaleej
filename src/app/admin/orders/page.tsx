"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrders } from "@/context/OrdersContext";
import { orderStatusLabels } from "@/data/mock";
import { SearchBar } from "@/components/ui/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import { orderStatusVariant } from "@/lib/order-status";

export default function AdminOrdersPage() {
  const { orders } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = orders.filter((o) => {
    if (search) {
      const q = search.toLowerCase();
      if (
        !o.orderNumber.toLowerCase().includes(q) &&
        !o.customerName.toLowerCase().includes(q) &&
        !o.city.toLowerCase().includes(q)
      )
        return false;
    }
    if (statusFilter && o.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">إدارة الطلبات</h1>
        <p className="text-slate-500 mt-1">{filtered.length} طلب</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="بحث برقم الطلب، العميل، المدينة..."
            className="flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          >
            <option value="">جميع الحالات</option>
            {Object.entries(orderStatusLabels).map(([k, v]) => (
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
                <th className="text-right p-4 font-medium">رقم الطلب</th>
                <th className="text-right p-4 font-medium">العميل / العيادة</th>
                <th className="text-right p-4 font-medium">المدينة</th>
                <th className="text-right p-4 font-medium">الإجمالي</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-right p-4 font-medium">التاريخ</th>
                <th className="text-center p-4 font-medium">تفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                  <td className="p-4 font-mono text-sky-600 font-medium">
                    {order.orderNumber}
                  </td>
                  <td className="p-4 text-slate-800">{order.customerName}</td>
                  <td className="p-4 text-slate-600">{order.city}</td>
                  <td className="p-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="p-4">
                    <Badge variant={orderStatusVariant[order.status]}>
                      {orderStatusLabels[order.status]}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-500 text-xs">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex p-1.5 rounded-lg hover:bg-sky-50 text-sky-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
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
