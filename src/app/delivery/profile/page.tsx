"use client";

import { useRouter } from "next/navigation";
import { useDelivery } from "@/context/DeliveryContext";
import { useToast } from "@/context/ToastContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  MapPin,
  BadgeCheck,
  Star,
  LogOut,
  Package,
  Route,
  Clock,
} from "lucide-react";

export default function DeliveryProfilePage() {
  const router = useRouter();
  const { currentAgent, isOnline, logout } = useDelivery();
  const { showToast } = useToast();

  if (!currentAgent) return null;

  const handleLogout = () => {
    logout();
    showToast("تم تسجيل الخروج");
    router.push("/delivery");
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="text-center mb-6">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-3"
          style={{ backgroundColor: currentAgent.avatarColor }}
        >
          {currentAgent.name.charAt(0)}
        </div>
        <h1 className="text-xl font-bold text-slate-800">{currentAgent.name}</h1>
        <Badge variant={isOnline ? "success" : "default"} className="mt-2">
          {isOnline ? "متصل" : "غير متصل"}
        </Badge>
      </div>

      <Card className="p-4 mb-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <BadgeCheck className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">رقم الموظف</p>
            <p className="font-medium text-slate-700">{currentAgent.employeeId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">رقم الهاتف</p>
            <p className="font-medium text-slate-700" dir="ltr">
              {currentAgent.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">المدينة</p>
            <p className="font-medium text-slate-700">{currentAgent.city}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Star className="w-4 h-4 text-amber-400" />
          <div>
            <p className="text-xs text-slate-400">التقييم</p>
            <p className="font-medium text-slate-700">
              {currentAgent.rating} / 5
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 text-center">
          <Package className="w-4 h-4 text-sky-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800">
            {currentAgent.totalOrders}
          </p>
          <p className="text-[10px] text-slate-500">إجمالي الطلبات</p>
        </Card>
        <Card className="p-3 text-center">
          <Route className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800">
            {currentAgent.totalDistance}
          </p>
          <p className="text-[10px] text-slate-500">كم إجمالي</p>
        </Card>
        <Card className="p-3 text-center">
          <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800">
            {currentAgent.avgDeliveryMinutes}
          </p>
          <p className="text-[10px] text-slate-500">دقيقة متوسط</p>
        </Card>
      </div>

      <Button variant="danger" className="w-full" onClick={handleLogout}>
        <LogOut className="w-4 h-4" />
        تسجيل الخروج
      </Button>
    </div>
  );
}
