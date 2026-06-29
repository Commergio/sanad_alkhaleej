"use client";

import { useState } from "react";
import { useOrders } from "@/context/OrdersContext";
import { deliveryAgents, orderStatusLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatDate } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";
import { Truck, Clock } from "lucide-react";

export default function AdminDeliveryPage() {
  const { orders, assignAgent } = useOrders();
  const { showToast } = useToast();
  const [assigning, setAssigning] = useState<string | null>(null);

  const readyOrders = orders.filter(
    (o) => o.status === "preparing" || o.status === "new" || o.status === "out_for_delivery"
  );

  const handleAssign = (orderId: string, agentId: string, agentName: string) => {
    assignAgent(orderId, agentId, agentName);
    showToast(`تم تعيين ${agentName} للطلب`);
    setAssigning(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">إدارة التوصيل</h1>
        <p className="text-slate-500 mt-1">تعيين المندوبين ومتابعة التوصيل</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">الطلبات الجاهزة للتوصيل</h3>
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
                        <p className="font-mono font-bold text-sky-600">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-slate-800 mt-1">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {order.city} — {order.address}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="info">
                            {orderStatusLabels[order.status]}
                          </Badge>
                          <span className="text-sm font-medium">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                      <div className="text-left">
                        {order.deliveryAgentName ? (
                          <div className="text-sm">
                            <p className="font-medium text-teal-600">
                              {order.deliveryAgentName}
                            </p>
                            <p className="text-xs text-slate-400">مندوب معيّن</p>
                          </div>
                        ) : assigning === order.id ? (
                          <div className="space-y-2">
                            {deliveryAgents
                              .filter((a) => a.status === "available")
                              .map((agent) => (
                                <button
                                  key={agent.id}
                                  onClick={() =>
                                    handleAssign(order.id, agent.id, agent.name)
                                  }
                                  className="block w-full text-right px-3 py-2 rounded-lg hover:bg-sky-50 text-sm"
                                >
                                  {agent.name}
                                </button>
                              ))}
                            <button
                              onClick={() => setAssigning(null)}
                              className="text-xs text-slate-400"
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
                            <Truck className="w-4 h-4" />
                            تعيين مندوب
                          </Button>
                        )}
                      </div>
                    </div>
                    {order.estimatedDelivery && (
                      <div className="flex items-center gap-1 mt-3 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        التسليم المتوقع: {formatDate(order.estimatedDelivery)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-800 mb-4">المندوبين المتاحين</h3>
            <div className="space-y-3">
              {deliveryAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-sm">{agent.name}</p>
                    <p className="text-xs text-slate-500">{agent.city}</p>
                  </div>
                  <Badge
                    variant={agent.status === "available" ? "success" : "warning"}
                  >
                    {agent.status === "available" ? "متاح" : "مشغول"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
