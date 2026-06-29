"use client";

import { User, Building2, Phone, Mail, MapPin, LogOut } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function ProfilePage() {
  return (
    <div className="p-4 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full gradient-hero mx-auto flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">د. أحمد العتيبي</h1>
        <Badge variant="info" className="mt-2">
          طبيب أسنان
        </Badge>
      </div>

      <Card className="p-4 mb-4">
        <h3 className="font-bold text-slate-800 mb-3">بيانات العيادة</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">عيادة العتيبي لطب الأسنان</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600" dir="ltr">0501234567</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">ahmed@clinic.sa</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">الرياض — حي العليا</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4">
        <h3 className="font-bold text-slate-800 mb-3">إحصائيات</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-sky-50">
            <p className="text-2xl font-bold text-sky-600">47</p>
            <p className="text-xs text-slate-500 mt-1">طلب</p>
          </div>
          <div className="p-3 rounded-xl bg-teal-50">
            <p className="text-2xl font-bold text-teal-600">12</p>
            <p className="text-xs text-slate-500 mt-1">هذا الشهر</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50">
            <p className="text-2xl font-bold text-emerald-600">3</p>
            <p className="text-xs text-slate-500 mt-1">قيد التوصيل</p>
          </div>
        </div>
      </Card>

      <div className="p-4 rounded-2xl bg-slate-50 text-center text-sm text-slate-500">
        <p>منصة B2B متخصصة — ليست متجراً عاماً</p>
        <p className="mt-1">مخصصة للأطباء والعيادات والمراكز الطبية</p>
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-red-500 text-sm font-medium">
        <LogOut className="w-4 h-4" />
        تسجيل الخروج (Demo)
      </button>
    </div>
  );
}
