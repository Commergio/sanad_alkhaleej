"use client";

import Link from "next/link";
import { useOrders } from "@/context/OrdersContext";
import { useDelivery } from "@/context/DeliveryContext";
import { deliveryManagementStats, orderStatusLabels } from "@/data/mock";
import { StatCard } from "@/components/admin/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDate } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { orderStatusVariant } from "@/lib/order-status";
import {
  Users,
  Truck,
  Wifi,
  Clock,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

export default function AdminDeliveryPage() {
  const { orders, assignAgent } = useOrders();
  const { agents } = useDelivery();
  const { showToast } = useToast();
  const [assigning, setAssigning] = useState<string | null>(null);

  const readyOrders = orders.filter(
    (o) =>
      o.status === "new" ||
      o.status === "preparing" ||
      o.status === "assigned" ||
      o.status === "out_for_delivery" ||
      o.status === "picked_up" ||
      o.status === "arrived"
  );

  const onlineCount = agents.filter((a) => a.isOnline).length;
  const deliveringCount = orders.filter(
    (o) =>
      o.status === "out_for_delivery" ||
      o.status === "picked_up" ||
      o.status === "arrived"
  ).length;

  const handleAssign = (orderId: string, agentId: string, agentName: string) => {
    assignAgent(orderId, agentId, agentName);
    showToast(`تم تعيين ${agentName} — الحالة: تم التعيين`);
    setAssigning(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">إدارة التوصيل</h1>
        <p className="text-slate-500 mt-1">
          متابعة المندوبين والطلبات قيد التوصيل
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="عدد المندوبين"
          value={deliveryManagementStats.totalDrivers}
          icon={Users}
          color="sky"
        />
        <StatCard
          title="قيد التوصيل"
          value={deliveringCount}
          icon={Truck}
          color="amber"
        />
        <StatCard
          title="متصلون الآن"
          value={onlineCount}
          icon={Wifi}
          color="emerald"
        />
        <StatCard
          title="متوسط وقت التوصيل"
          value={`${deliveryManagementStats.avgDeliveryMinutes} د`}
          icon={Clock}
          color="teal"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">الطلبات الجاهزة للتوصيل</h3>
              <Link href="/admin/drivers" className="text-xs text-sky-600">
                إدارة المندوبين
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {readyOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  لا توجد طلبات للتوصيل
                </div>
              ) : (
                readyOrders.map((order) => (
                  <div key={order.id} className="p-4 hover:bg-slate-50/50">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono font-bold text-sky-600 hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                        <p className="text-sm text-slate-800 mt-1">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {order.city} — {order.address}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant={orderStatusVariant[order.status]}>
                            {orderStatusLabels[order.status]}
                          </Badge>
                          <span className="text-sm font-medium">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                        {order.estimatedDelivery && (
                          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(order.estimatedDelivery)}
                          </p>
                        )}
                      </div>
                      <div className="text-left shrink-0">
                        {order.deliveryAgentName ? (
                          <div className="text-sm">
                            <p className="font-medium text-teal-600">
                              {order.deliveryAgentName}
                            </p>
                            <p className="text-xs text-slate-400">مندوب معيّن</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="mt-1 !text-xs"
                              onClick={() => setAssigning(order.id)}
                            >
                              تغيير
                            </Button>
                          </div>
                        ) : assigning === order.id ? (
                          <div className="space-y-1 min-w-[140px]">
                            {agents
                              .filter((a) => a.isOnline || a.status === "available")
                              .map((agent) => (
                                <button
                                  key={agent.id}
                                  onClick={() =>
                                    handleAssign(order.id, agent.id, agent.name)
                                  }
                                  className="block w-full text-right px-3 py-2 rounded-lg hover:bg-sky-50 text-sm"
                                >
                                  {agent.name}
                                  <span className="text-[10px] text-slate-400 block">
                                    {agent.isOnline ? "متصل" : "متاح"}
                                  </span>
                                </button>
                              ))}
                            <button
                              onClick={() => setAssigning(null)}
                              className="text-xs text-slate-400 px-3"
                            >
                              إلغاء
                            </button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAssigning(order.id)}
                          >
                            <UserCheck className="w-4 h-4" />
                            تعيين مندوب
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-800 mb-4">حالة المندوبين</h3>
            <div className="space-y-3">
              {agents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/admin/drivers/${agent.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: agent.avatarColor }}
                    >
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{agent.name}</p>
                      <p className="text-xs text-slate-500">{agent.city}</p>
                    </div>
                  </div>
                  <Badge variant={agent.isOnline ? "success" : "default"}>
                    {agent.isOnline ? "متصل" : "غير متصل"}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
