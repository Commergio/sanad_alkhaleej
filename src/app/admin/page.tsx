"use client";

import {
  Package,
  ClipboardList,
  Truck,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import {
  dashboardStats,
  salesChartData,
  orderStatusChartData,
  topProducts,
} from "@/data/mock";
import { useOrders } from "@/context/OrdersContext";
import { formatPrice, formatDate } from "@/lib/utils";
import { orderStatusLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
import Link from "next/link";
import { OrderStatus } from "@/types";

const statusVariant: Record<OrderStatus, "info" | "warning" | "success" | "danger" | "default"> = {
  new: "info",
  preparing: "warning",
  out_for_delivery: "default",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminDashboard() {
  const { orders } = useOrders();
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">لوحة التحكم</h1>
        <p className="text-slate-500 mt-1">
          نظرة عامة على أداء منصة سند الخليج
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="إجمالي المنتجات"
          value={dashboardStats.totalProducts}
          icon={Package}
          color="sky"
        />
        <StatCard
          title="طلبات اليوم"
          value={dashboardStats.todayOrders}
          icon={ClipboardList}
          color="teal"
          trend="+3 عن أمس"
        />
        <StatCard
          title="قيد التوصيل"
          value={dashboardStats.deliveringOrders}
          icon={Truck}
          color="amber"
        />
        <StatCard
          title="إجمالي المبيعات"
          value={formatPrice(dashboardStats.totalSales)}
          icon={DollarSign}
          color="emerald"
          trend={`+${dashboardStats.salesGrowth}%`}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-bold text-slate-800 mb-4">المبيعات الشهرية</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => formatPrice(Number(value))}
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
              <Bar dataKey="sales" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-slate-800 mb-4">حالات الطلبات</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={orderStatusChartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {orderStatusChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {orderStatusChartData.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-600">{item.status}</span>
                </div>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top products */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-slate-800">أكثر المنتجات طلباً</h3>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700">{p.name}</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800">{p.orders} طلب</p>
                  <p className="text-xs text-slate-400">{formatPrice(p.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent orders */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">أحدث الطلبات</h3>
            <Link href="/admin/orders" className="text-xs text-sky-600">
              عرض الكل
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs">
                  <th className="text-right pb-3 font-medium">الطلب</th>
                  <th className="text-right pb-3 font-medium">العميل</th>
                  <th className="text-right pb-3 font-medium">الحالة</th>
                  <th className="text-left pb-3 font-medium">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-50">
                    <td className="py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono text-sky-600 text-xs hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {formatDate(order.createdAt)}
                      </p>
                    </td>
                    <td className="py-3 text-slate-700">{order.customerName}</td>
                    <td className="py-3">
                      <Badge variant={statusVariant[order.status]} className="text-[10px]">
                        {orderStatusLabels[order.status]}
                      </Badge>
                    </td>
                    <td className="py-3 text-left font-medium">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
