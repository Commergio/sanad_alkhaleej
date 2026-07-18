"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useDelivery } from "@/context/DeliveryContext";
import { useOrders } from "@/context/OrdersContext";
import { orderStatusLabels } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatPrice, formatDate } from "@/lib/utils";
import { orderStatusVariant } from "@/lib/order-status";
import {
  ArrowRight,
  Star,
  Package,
  Route,
  Clock,
  Phone,
  MapPin,
} from "lucide-react";

export default function AdminDriverDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getAgent } = useDelivery();
  const { getOrdersByAgent } = useOrders();
  const agent = getAgent(id);

  if (!agent) notFound();

  const agentOrders = getOrdersByAgent(agent.id);
  const currentOrders = agentOrders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );
  const pastOrders = agentOrders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled"
  );

  return (
    <div>
      <Link
        href="/admin/drivers"
        className="inline-flex items-center gap-1 text-sm text-sky-600 mb-4"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للمندوبين
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
          style={{ backgroundColor: agent.avatarColor }}
        >
          {agent.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">{agent.name}</h1>
          <p className="text-slate-500">{agent.employeeId}</p>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant={agent.isOnline ? "success" : "default"}>
              {agent.isOnline ? "متصل الآن" : "غير متصل"}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {agent.rating}
            </span>
          </div>
        </div>
        <div className="text-sm text-slate-600 space-y-1">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span dir="ltr">{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            {agent.city}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <Package className="w-5 h-5 text-sky-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{agent.totalOrders}</p>
          <p className="text-xs text-slate-500">إجمالي الطلبات</p>
        </Card>
        <Card className="p-4 text-center">
          <Route className="w-5 h-5 text-teal-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{agent.totalDistance}</p>
          <p className="text-xs text-slate-500">إجمالي المسافة (كم)</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-5 h-5 text-amber-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{agent.avgDeliveryMinutes}</p>
          <p className="text-xs text-slate-500">متوسط وقت التسليم (د)</p>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{agent.rating}</p>
          <p className="text-xs text-slate-500">التقييم</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-bold text-slate-800 mb-4">
            الطلبات الحالية ({currentOrders.length})
          </h3>
          {currentOrders.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">
              لا توجد طلبات حالية
            </p>
          ) : (
            <div className="space-y-3">
              {currentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-3 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-sky-600">
                      {order.orderNumber}
                    </span>
                    <Badge variant={orderStatusVariant[order.status]}>
                      {orderStatusLabels[order.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">{order.customerName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatPrice(order.total)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-slate-800 mb-4">
            الطلبات السابقة ({pastOrders.length})
          </h3>
          {pastOrders.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">
              لا توجد طلبات سابقة
            </p>
          ) : (
            <div className="space-y-3">
              {pastOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-3 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-sky-600">
                      {order.orderNumber}
                    </span>
                    <Badge variant={orderStatusVariant[order.status]}>
                      {orderStatusLabels[order.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">{order.customerName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatDate(order.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
