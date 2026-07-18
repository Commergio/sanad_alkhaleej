"use client";

import Link from "next/link";
import { useDelivery } from "@/context/DeliveryContext";
import { useOrders } from "@/context/OrdersContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import { orderStatusLabels } from "@/data/mock";
import { orderStatusVariant } from "@/lib/order-status";
import {
  ClipboardList,
  MapPin,
  Package,
  Clock,
  Navigation,
} from "lucide-react";

export default function DeliveryOrdersPage() {
  const { currentAgent } = useDelivery();
  const { getOrdersByAgent } = useOrders();

  if (!currentAgent) return null;

  const myOrders = getOrdersByAgent(currentAgent.id);

  if (myOrders.length === 0) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="لا توجد طلبات"
        description="ستظهر الطلبات المسندة إليك هنا"
      />
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-800 mb-1">طلباتي</h1>
      <p className="text-sm text-slate-500 mb-4">{myOrders.length} طلب مسند</p>

      <div className="space-y-3">
        {myOrders.map((order) => {
          const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
          return (
            <Card key={order.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-teal-600 text-sm">
                  {order.orderNumber}
                </span>
                <Badge variant={orderStatusVariant[order.status]}>
                  {orderStatusLabels[order.status]}
                </Badge>
              </div>

              <h3 className="font-bold text-slate-800">{order.customerName}</h3>
              {order.doctorName && (
                <p className="text-sm text-slate-500 mt-0.5">{order.doctorName}</p>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {order.city}
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  {itemCount} منتج
                </div>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  {order.distanceKm ?? "—"} كم
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {order.etaMinutes ?? "—"} دقيقة
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                <span className="font-bold text-slate-800">
                  {formatPrice(order.total)}
                </span>
                <Link href={`/delivery/orders/${order.id}`}>
                  <Button size="sm" variant="outline" className="!border-teal-200 !text-teal-700">
                    عرض التفاصيل
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
