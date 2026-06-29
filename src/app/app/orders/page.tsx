"use client";

import Link from "next/link";
import { useOrders } from "@/context/OrdersContext";
import { orderStatusLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice, formatDate } from "@/lib/utils";
import { ClipboardList, ChevronLeft, MapPin } from "lucide-react";
import { OrderStatus } from "@/types";

const statusVariant: Record<OrderStatus, "info" | "warning" | "success" | "danger" | "default"> = {
  new: "info",
  preparing: "warning",
  out_for_delivery: "default",
  delivered: "success",
  cancelled: "danger",
};

export default function OrdersPage() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="لا توجد طلبات"
        description="ستظهر طلباتك هنا بعد تأكيد أول طلب"
      />
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-800 mb-4">طلباتي</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={
              order.status === "delivered"
                ? `/app/orders/${order.orderNumber}/track`
                : `/app/orders/${order.orderNumber}/track`
            }
          >
            <div className="p-4 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-sky-600 text-sm">
                  {order.orderNumber}
                </span>
                <Badge variant={statusVariant[order.status]}>
                  {orderStatusLabels[order.status]}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {formatDate(order.createdAt)}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  {order.city}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">
                    {formatPrice(order.total)}
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
