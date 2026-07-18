"use client";

import { useDelivery } from "@/context/DeliveryContext";
import { useOrders } from "@/context/OrdersContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Navigation, MapPin, Clock, Route } from "lucide-react";

export default function DeliveryMapPage() {
  const { currentAgent } = useDelivery();
  const { getOrdersByAgent } = useOrders();
  const { showToast } = useToast();

  if (!currentAgent) return null;

  const activeOrder = getOrdersByAgent(currentAgent.id).find(
    (o) =>
      o.status === "out_for_delivery" ||
      o.status === "picked_up" ||
      o.status === "arrived" ||
      o.status === "accepted"
  );

  const distance = activeOrder?.distanceKm ?? 5.2;
  const eta = activeOrder?.etaMinutes ?? 18;

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-xl font-bold text-slate-800 mb-1">الخريطة</h1>
        <p className="text-sm text-slate-500">
          {activeOrder
            ? `التوجه إلى: ${activeOrder.customerName}`
            : "لا يوجد طلب نشط للملاحة"}
        </p>
      </div>

      {/* Map placeholder */}
      <div className="relative flex-1 min-h-[360px] mx-4 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-slate-100 to-teal-100">
          <svg className="w-full h-full opacity-40" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
            {/* Roads */}
            <path d="M0 200 Q100 180 200 200 T400 180" fill="none" stroke="#cbd5e1" strokeWidth="12" />
            <path d="M150 0 Q170 150 160 400" fill="none" stroke="#cbd5e1" strokeWidth="10" />
            <path d="M0 280 L400 300" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            {/* Route line */}
            <line
              x1="100"
              y1="280"
              x2="300"
              y2="120"
              stroke="#14b8a6"
              strokeWidth="4"
              strokeDasharray="10 6"
              strokeLinecap="round"
            />
            {/* Driver position */}
            <circle cx="100" cy="280" r="16" fill="#0ea5e9" opacity="0.3" />
            <circle cx="100" cy="280" r="10" fill="#0ea5e9" />
            {/* Customer position */}
            <circle cx="300" cy="120" r="16" fill="#10b981" opacity="0.3" />
            <circle cx="300" cy="120" r="10" fill="#10b981" />
          </svg>
        </div>

        {/* Legend pins */}
        <div className="absolute top-3 right-3 space-y-2">
          <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-sm flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            موقعك الحالي
          </div>
          <div className="bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-sm flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            موقع العميل
          </div>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3">
          <Card className="p-4 !rounded-xl shadow-lg">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-teal-500" />
                <div>
                  <p className="text-[10px] text-slate-400">المسافة</p>
                  <p className="font-bold text-sm text-slate-800">{distance} كم</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <div>
                  <p className="text-[10px] text-slate-400">الوقت المتوقع</p>
                  <p className="font-bold text-sm text-slate-800">{eta} دقيقة</p>
                </div>
              </div>
            </div>
            {activeOrder && (
              <div className="flex items-start gap-2 mb-4 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  {activeOrder.address} — {activeOrder.city}
                </span>
              </div>
            )}
            <Button
              className="w-full !bg-teal-500 hover:!bg-teal-600"
              size="lg"
              onClick={() =>
                showToast(
                  activeOrder
                    ? `بدء الملاحة إلى ${activeOrder.customerName}`
                    : "لا يوجد طلب نشط",
                  activeOrder ? "success" : "warning"
                )
              }
            >
              <Navigation className="w-5 h-5" />
              ابدأ الملاحة
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
