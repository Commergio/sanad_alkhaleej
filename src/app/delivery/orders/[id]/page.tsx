"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import { useToast } from "@/context/ToastContext";
import { orderStatusLabels, deliveryTimelineSteps } from "@/data/mock";
import { OrderStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { orderStatusVariant } from "@/lib/order-status";
import {
  ArrowRight,
  Phone,
  MapPin,
  Package,
  CheckCircle2,
  Circle,
  Navigation,
  MessageSquare,
} from "lucide-react";

const timelineStatusIndex: Record<string, number> = {
  new: 0,
  assigned: 1,
  accepted: 1,
  preparing: 2,
  picked_up: 3,
  out_for_delivery: 4,
  arrived: 5,
  delivered: 6,
};

export default function DeliveryOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrder, updateOrderStatus } = useOrders();
  const { showToast } = useToast();
  const order = getOrder(id);

  if (!order) notFound();

  const currentStep = timelineStatusIndex[order.status] ?? 0;

  const setStatus = (status: OrderStatus, message: string) => {
    updateOrderStatus(order.id, status);
    showToast(message);
  };

  const actions: {
    show: boolean;
    label: string;
    status: OrderStatus;
    message: string;
    variant?: "primary" | "danger" | "secondary" | "outline";
  }[] = [
    {
      show: order.status === "assigned",
      label: "قبول الطلب",
      status: "accepted",
      message: "تم قبول الطلب",
      variant: "secondary",
    },
    {
      show: order.status === "assigned",
      label: "رفض الطلب",
      status: "cancelled",
      message: "تم رفض الطلب",
      variant: "danger",
    },
    {
      show: order.status === "accepted" || order.status === "preparing",
      label: "تم الاستلام من المستودع",
      status: "picked_up",
      message: "تم استلام الطلب من المستودع",
      variant: "secondary",
    },
    {
      show: order.status === "picked_up",
      label: "بدء التوصيل",
      status: "out_for_delivery",
      message: "بدأت رحلة التوصيل",
      variant: "primary",
    },
    {
      show: order.status === "out_for_delivery",
      label: "تم الوصول",
      status: "arrived",
      message: "وصلت إلى موقع العميل",
      variant: "secondary",
    },
    {
      show: order.status === "arrived",
      label: "تم التسليم",
      status: "delivered",
      message: "تم تسليم الطلب بنجاح!",
      variant: "secondary",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="p-4 bg-white border-b border-slate-100">
        <Link
          href="/delivery/orders"
          className="inline-flex items-center gap-1 text-sm text-teal-600 mb-3"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للطلبات
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold font-mono text-slate-800">
            {order.orderNumber}
          </h1>
          <Badge variant={orderStatusVariant[order.status]}>
            {orderStatusLabels[order.status]}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer */}
        <Card className="p-4">
          <h3 className="font-bold text-slate-800 mb-3">بيانات العميل</h3>
          <p className="font-semibold text-slate-700">{order.customerName}</p>
          {order.doctorName && (
            <p className="text-sm text-slate-500 mt-0.5">{order.doctorName}</p>
          )}
          <div className="flex items-center gap-2 mt-3 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <a href={`tel:${order.phone}`} className="text-teal-600" dir="ltr">
              {order.phone}
            </a>
          </div>
          <div className="flex items-start gap-2 mt-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {order.address} — {order.city}
            </span>
          </div>
        </Card>

        {/* Map placeholder */}
        <Card className="overflow-hidden">
          <div className="relative h-36 bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100">
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 160">
                <pattern id="dgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dgrid)" />
                <line x1="80" y1="120" x2="300" y2="40" stroke="#14b8a6" strokeWidth="3" strokeDasharray="8 4" />
                <circle cx="80" cy="120" r="10" fill="#0ea5e9" />
                <circle cx="300" cy="40" r="10" fill="#10b981" />
              </svg>
            </div>
            <div className="absolute bottom-3 inset-x-3 flex gap-2 text-[10px]">
              <span className="bg-white/90 px-2 py-1 rounded-lg shadow-sm">
                أنت · {order.distanceKm ?? 0} كم
              </span>
              <span className="bg-white/90 px-2 py-1 rounded-lg shadow-sm">
                ETA · {order.etaMinutes ?? "—"} د
              </span>
            </div>
          </div>
          <div className="p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600">موقع العيادة</span>
            <Link href="/delivery/map">
              <Button size="sm" variant="outline">
                <Navigation className="w-3.5 h-3.5" />
                الخريطة
              </Button>
            </Link>
          </div>
        </Card>

        {/* Products */}
        <Card className="p-4">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-500" />
            المنتجات
          </h3>
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0"
              >
                <div>
                  <p className="text-slate-700">{item.productName}</p>
                  <p className="text-xs text-slate-400">× {item.quantity}</p>
                </div>
                <span className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold mt-3 pt-2 border-t border-slate-100">
            <span>الإجمالي</span>
            <span className="text-teal-600">{formatPrice(order.total)}</span>
          </div>
        </Card>

        {/* Notes */}
        {order.notes && (
          <Card className="p-4 bg-amber-50/50 border-amber-100">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs text-amber-700 font-medium mb-1">
                  ملاحظات العميل
                </p>
                <p className="text-sm text-slate-700">{order.notes}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Timeline */}
        <Card className="p-4">
          <h3 className="font-bold text-slate-800 mb-4">تتبع الطلب</h3>
          <div className="space-y-0">
            {deliveryTimelineSteps.map((step, index) => {
              const isCompleted = index <= currentStep && order.status !== "cancelled";
              const isCurrent = index === currentStep && order.status !== "cancelled";
              return (
                <div key={step.status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      } ${isCurrent ? "ring-4 ring-teal-100" : ""}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    {index < deliveryTimelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 ${
                          index < currentStep ? "bg-teal-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-sm font-semibold ${
                        isCompleted ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action buttons */}
        {order.status !== "delivered" && order.status !== "cancelled" && (
          <div className="space-y-2 pb-4">
            {actions
              .filter((a) => a.show)
              .map((action) => (
                <Button
                  key={action.label}
                  className={`w-full ${
                    action.variant === "secondary"
                      ? "!bg-teal-500 hover:!bg-teal-600"
                      : ""
                  }`}
                  variant={
                    action.variant === "secondary" ? "primary" : action.variant
                  }
                  size="lg"
                  onClick={() => setStatus(action.status, action.message)}
                >
                  {action.label}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
