"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import { orderStatusLabels, deliveryTimelineSteps } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Truck,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const timelineIndex: Record<string, number> = {
  new: 0,
  assigned: 1,
  accepted: 1,
  preparing: 2,
  picked_up: 3,
  out_for_delivery: 4,
  arrived: 5,
  delivered: 6,
};

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) notFound();

  const currentStepIndex =
    order.status === "cancelled" ? 0 : (timelineIndex[order.status] ?? 0);

  const agent = order.deliveryAgentName || "مندوب التوصيل";
  const agentPhone = "0501112233";
  const eta = order.estimatedDelivery
    ? formatDate(order.estimatedDelivery)
    : order.etaMinutes
      ? `خلال ${order.etaMinutes} دقيقة`
      : "خلال ساعتين";

  return (
    <div className="animate-fade-in min-h-screen bg-slate-50">
      <div className="p-4 bg-white border-b border-slate-100">
        <Link
          href="/app/orders"
          className="inline-flex items-center gap-1 text-sm text-sky-600 mb-3"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للطلبات
        </Link>
        <h1 className="text-lg font-bold text-slate-800">تتبع الطلب</h1>
        <p className="font-mono text-sky-600 text-sm mt-1">{order.orderNumber}</p>
      </div>

      <div className="relative h-48 bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 animate-pulse-soft" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 left-3">
          <Card className="p-3 !rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-slate-800">{agent}</p>
                <p className="text-xs text-slate-500">مندوب التوصيل</p>
              </div>
              <a
                href={`tel:${agentPhone}`}
                className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
              </a>
            </div>
          </Card>
        </div>
      </div>

      <div className="p-4">
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm text-slate-500">الوقت المتوقع للتوصيل</p>
              <p className="font-bold text-slate-800">{eta}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
            <MapPin className="w-4 h-4" />
            {order.address} — {order.city}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-bold text-slate-800 mb-4">حالة الطلب</h3>
          <div className="space-y-0">
            {deliveryTimelineSteps.map((step, index) => {
              const isCompleted =
                index <= currentStepIndex && order.status !== "cancelled";
              const isCurrent =
                index === currentStepIndex && order.status !== "cancelled";

              return (
                <div key={step.status} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-sky-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      } ${isCurrent ? "ring-4 ring-sky-100" : ""}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </div>
                    {index < deliveryTimelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-8 ${
                          index < currentStepIndex ? "bg-sky-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`font-semibold text-sm ${
                        isCompleted ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-sky-600 mt-0.5 animate-pulse-soft">
                        {orderStatusLabels[order.status]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
