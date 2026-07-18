"use client";

import Link from "next/link";
import { useDelivery } from "@/context/DeliveryContext";
import { Badge } from "@/components/ui/Badge";
import { Eye, Star } from "lucide-react";

export default function AdminDriversPage() {
  const { agents } = useDelivery();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">المندوبين</h1>
        <p className="text-slate-500 mt-1">{agents.length} مندوب توصيل</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-xs">
                <th className="text-right p-4 font-medium">المندوب</th>
                <th className="text-right p-4 font-medium">الهاتف</th>
                <th className="text-right p-4 font-medium">المدينة</th>
                <th className="text-right p-4 font-medium">الطلبات</th>
                <th className="text-right p-4 font-medium">الحالة</th>
                <th className="text-right p-4 font-medium">الاتصال</th>
                <th className="text-center p-4 font-medium">عرض</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-t border-slate-50 hover:bg-slate-50/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: agent.avatarColor }}
                      >
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{agent.name}</p>
                        <p className="text-xs text-slate-400">{agent.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4" dir="ltr">
                    {agent.phone}
                  </td>
                  <td className="p-4 text-slate-600">{agent.city}</td>
                  <td className="p-4">
                    <span className="font-medium">{agent.totalOrders}</span>
                    <span className="text-xs text-slate-400 mr-1">
                      ({agent.activeOrders} نشط)
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        agent.status === "available"
                          ? "success"
                          : agent.status === "busy"
                            ? "warning"
                            : "default"
                      }
                    >
                      {agent.status === "available"
                        ? "متاح"
                        : agent.status === "busy"
                          ? "مشغول"
                          : "غير متصل"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          agent.isOnline ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />
                      <span className="text-xs">
                        {agent.isOnline ? "متصل" : "غير متصل"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {agent.rating}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Link
                      href={`/admin/drivers/${agent.id}`}
                      className="inline-flex p-1.5 rounded-lg hover:bg-sky-50 text-sky-600"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
