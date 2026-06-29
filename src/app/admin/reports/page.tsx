"use client";

import {
  topProducts,
  salesByCategory,
  orderStatusChartData,
  lowStockProducts,
  customers,
} from "@/data/mock";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, AlertTriangle } from "lucide-react";

export default function AdminReportsPage() {
  const topCustomers = [...customers]
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">التقارير</h1>
        <p className="text-slate-500 mt-1">تحليلات وإحصائيات المنصة</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Top products */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-800">أكثر المنتجات طلباً</h3>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{p.name}</span>
                </div>
                <span className="text-sm font-bold">{p.orders} طلب</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top customers */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-slate-800">أكثر العملاء طلباً</h3>
          </div>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{c.name}</span>
                </div>
                <span className="text-sm font-bold">{c.orderCount} طلب</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Sales by category */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-800 mb-4">المبيعات حسب الأقسام</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salesByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip formatter={(v) => formatPrice(Number(v))} />
              <Bar dataKey="sales" fill="#14b8a6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders by status */}
        <Card className="p-5">
          <h3 className="font-bold text-slate-800 mb-4">الطلبات حسب الحالة</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={orderStatusChartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(props) => {
                  const entry = orderStatusChartData[props.index ?? 0];
                  return entry ? `${entry.status}: ${entry.count}` : "";
                }}
              >
                {orderStatusChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Low stock */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-800">منتجات منخفضة المخزون</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100">
                <th className="text-right pb-3">المنتج</th>
                <th className="text-right pb-3">SKU</th>
                <th className="text-right pb-3">الكمية المتبقية</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((p) => (
                <tr key={p.id} className="border-b border-slate-50">
                  <td className="py-3 text-slate-800">{p.name}</td>
                  <td className="py-3 font-mono text-xs text-slate-500">{p.sku}</td>
                  <td className="py-3 font-bold text-amber-600">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
