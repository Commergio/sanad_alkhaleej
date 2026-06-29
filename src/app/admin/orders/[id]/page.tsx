"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import { orderStatusLabels, customerTypeLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { formatPrice, formatDate } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { OrderStatus } from "@/types";
import { ArrowRight, User, MapPin, Phone, Package } from "lucide-react";

const statusVariant: Record<OrderStatus, "info" | "warning" | "success" | "danger" | "default"> = {
  new: "info",
  preparing: "warning",
  out_for_delivery: "default",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrder, updateOrderStatus } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);
  const [status, setStatus] = useState<OrderStatus | "">("");

  if (!order) notFound();

  const handleStatusChange = () => {
    if (!status) return;
    updateOrderStatus(order.id, status);
    showToast(`تم تحديث الحالة إلى: ${orderStatusLabels[status]}`);
    setStatus("");
  };

  return (
    <div>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-sky-600 mb-4"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للطلبات
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-mono">
            {order.orderNumber}
          </h1>
          <p className="text-slate-500 mt-1">{formatDate(order.createdAt)}</p>
        </div>
        <Badge variant={statusVariant[order.status]} className="text-sm px-3 py-1">
          {orderStatusLabels[order.status]}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          <Card className="p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-sky-500" />
              بيانات العميل
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">الاسم</p>
                <p className="font-medium text-slate-800">{order.customerName}</p>
              </div>
              <div>
                <p className="text-slate-400">النوع</p>
                <p className="font-medium">{customerTypeLabels[order.customerType]}</p>
              </div>
              <div>
                <p className="text-slate-400">الجوال</p>
                <p className="font-medium" dir="ltr">{order.phone}</p>
              </div>
              <div>
                <p className="text-slate-400">المدينة</p>
                <p className="font-medium">{order.city}</p>
              </div>
            </div>
          </Card>

          {/* Products */}
          <Card className="p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-teal-500" />
              المنتجات المطلوبة
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-xs border-b border-slate-100">
                  <th className="text-right pb-3">المنتج</th>
                  <th className="text-right pb-3">SKU</th>
                  <th className="text-center pb-3">الكمية</th>
                  <th className="text-left pb-3">السعر</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="py-3 text-slate-800">{item.productName}</td>
                    <td className="py-3 font-mono text-xs text-slate-500">{item.sku}</td>
                    <td className="py-3 text-center">{item.quantity}</td>
                    <td className="py-3 text-left font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-left font-bold text-slate-800">
                    الإجمالي
                  </td>
                  <td className="pt-4 text-left font-bold text-sky-600 text-lg">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </Card>

          {/* Delivery */}
          <Card className="p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" />
              عنوان التوصيل
            </h3>
            <p className="text-slate-600">{order.address}</p>
            <p className="text-slate-500 text-sm mt-1">{order.city}</p>
            {order.deliveryAgentName && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium">{order.deliveryAgentName}</p>
                  <p className="text-xs text-slate-500">مندوب التوصيل</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Status change */}
        <div>
          <Card className="p-5 sticky top-24">
            <h3 className="font-bold text-slate-800 mb-4">تغيير حالة الطلب</h3>
            <Select
              label="الحالة الجديدة"
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              options={[
                { value: "", label: "اختر الحالة" },
                ...Object.entries(orderStatusLabels).map(([k, v]) => ({
                  value: k,
                  label: v,
                })),
              ]}
            />
            <Button
              className="w-full mt-4"
              onClick={handleStatusChange}
              disabled={!status}
            >
              تحديث الحالة
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
