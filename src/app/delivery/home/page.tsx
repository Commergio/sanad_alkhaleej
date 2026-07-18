"use client";

import Link from "next/link";
import { useDelivery } from "@/context/DeliveryContext";
import { useOrders } from "@/context/OrdersContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Package,
  CheckCircle2,
  Navigation,
  Route,
  Wifi,
  WifiOff,
  ChevronLeft,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { orderStatusLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { orderStatusVariant } from "@/lib/order-status";

export default function DeliveryHomePage() {
  const { currentAgent, isOnline, setReceivingOrders } = useDelivery();
  const { getOrdersByAgent } = useOrders();

  if (!currentAgent) return null;

  const myOrders = getOrdersByAgent(currentAgent.id);
  const activeOrders = myOrders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );
  const deliveredToday = myOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="p-4 animate-fade-in space-y-4">
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md"
          style={{ backgroundColor: currentAgent.avatarColor }}
        >
          {currentAgent.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{currentAgent.name}</h1>
          <p className="text-sm text-slate-500">{currentAgent.employeeId}</p>
          <p className="text-xs text-slate-400 mt-0.5">{currentAgent.city}</p>
        </div>
      </div>

      {/* Online card */}
      <Card
        className={`p-4 border-2 ${
          isOnline
            ? "border-emerald-200 bg-emerald-50/50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isOnline ? "bg-emerald-100" : "bg-slate-200"
              }`}
            >
              {isOnline ? (
                <Wifi className="w-5 h-5 text-emerald-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-slate-500" />
              )}
            </div>
            <div>
              <p className="font-bold text-slate-800">
                {isOnline ? "أنت متصل الآن" : "أنت غير متصل"}
              </p>
              <p className="text-xs text-slate-500">
                {isOnline
                  ? "يمكنك استقبال الطلبات الجديدة"
                  : "فعّل الاستقبال لبدء التوصيل"}
              </p>
            </div>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-emerald-500 animate-pulse-soft" : "bg-slate-400"
            }`}
          />
        </div>
        <Button
          className={`w-full ${
            isOnline
              ? "!bg-slate-600 hover:!bg-slate-700"
              : "!bg-teal-500 hover:!bg-teal-600"
          }`}
          onClick={() => setReceivingOrders(!isOnline)}
        >
          {isOnline ? "إيقاف استقبال الطلبات" : "بدء استقبال الطلبات"}
        </Button>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 text-center">
          <Package className="w-5 h-5 text-sky-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-800">
            {currentAgent.todayOrders}
          </p>
          <p className="text-xs text-slate-500">طلبات اليوم</p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-800">
            {currentAgent.todayDelivered || deliveredToday}
          </p>
          <p className="text-xs text-slate-500">تم تسليمها</p>
        </Card>
        <Card className="p-4 text-center">
          <Navigation className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-800">{activeOrders.length}</p>
          <p className="text-xs text-slate-500">طلبات حالية</p>
        </Card>
        <Card className="p-4 text-center">
          <Route className="w-5 h-5 text-teal-500 mx-auto mb-1" />
          <p className="text-2xl font-bold text-slate-800">
            {activeOrders.reduce((s, o) => s + (o.distanceKm || 0), 0).toFixed(1)}
          </p>
          <p className="text-xs text-slate-500">كم متبقية</p>
        </Card>
      </div>

      {/* Active orders preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800">الطلبات النشطة</h2>
          <Link
            href="/delivery/orders"
            className="text-xs text-teal-600 flex items-center gap-1"
          >
            عرض الكل
            <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <Card className="p-6 text-center text-sm text-slate-500">
            لا توجد طلبات نشطة حالياً
          </Card>
        ) : (
          <div className="space-y-3">
            {activeOrders.slice(0, 3).map((order) => (
              <Link key={order.id} href={`/delivery/orders/${order.id}`}>
                <Card hover className="p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-teal-600">
                      {order.orderNumber}
                    </span>
                    <Badge variant={orderStatusVariant[order.status]}>
                      {orderStatusLabels[order.status]}
                    </Badge>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">
                    {order.customerName}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>{order.city}</span>
                    <span className="font-medium text-slate-700">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
