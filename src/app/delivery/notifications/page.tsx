"use client";

import { driverNotifications } from "@/data/mock";
import { Card } from "@/components/ui/Card";
import {
  Package,
  MapPin,
  Phone,
  XCircle,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { DriverNotificationType } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<DriverNotificationType, React.ElementType> = {
  new_order: Package,
  address_changed: MapPin,
  customer_called: Phone,
  order_cancelled: XCircle,
  order_delivered: CheckCircle2,
};

const colorMap: Record<DriverNotificationType, string> = {
  new_order: "bg-sky-100 text-sky-600",
  address_changed: "bg-amber-100 text-amber-600",
  customer_called: "bg-violet-100 text-violet-600",
  order_cancelled: "bg-red-100 text-red-600",
  order_delivered: "bg-emerald-100 text-emerald-600",
};

export default function DeliveryNotificationsPage() {
  return (
    <div className="p-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-teal-500" />
        <h1 className="text-xl font-bold text-slate-800">الإشعارات</h1>
      </div>

      <div className="space-y-3">
        {driverNotifications.map((notif) => {
          const Icon = iconMap[notif.type];
          return (
            <Card
              key={notif.id}
              className={cn(
                "p-4",
                !notif.read && "border-teal-200 bg-teal-50/30"
              )}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    colorMap[notif.type]
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-800">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
