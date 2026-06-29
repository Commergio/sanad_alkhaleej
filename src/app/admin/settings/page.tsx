"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import { Building2, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const { showToast } = useToast();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">الإعدادات</h1>
        <p className="text-slate-500 mt-1">إعدادات المنصة العامة</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-slate-800">بيانات الشركة</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="اسم الشركة"
              defaultValue="سند الخليج للمعدات الطبية ومواد الأسنان"
            />
            <Input label="البريد الإلكتروني" defaultValue="info@sanadalkhalij.sa" />
            <Input label="رقم الهاتف" defaultValue="0112345678" dir="ltr" />
            <Input label="العنوان" defaultValue="الرياض، المملكة العربية السعودية" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-slate-800">الإشعارات</h3>
          </div>
          <div className="space-y-3">
            {[
              "إشعار عند طلب جديد",
              "إشعار عند انخفاض المخزون",
              "إشعار عند اكتمال التوصيل",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer"
              >
                <span className="text-sm text-slate-700">{label}</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-800">الأمان</h3>
          </div>
          <div className="space-y-4">
            <Input label="كلمة المرور الحالية" type="password" />
            <Input label="كلمة المرور الجديدة" type="password" />
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-violet-500" />
            <h3 className="font-bold text-slate-800">المنصة</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            منصة B2B متخصصة لمنتجات ومعدات الأسنان — ليست متجراً عاماً
          </p>
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <span className="text-sm text-slate-700">تفعيل التسجيل للعيادات الجديدة</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        </Card>

        <Button
          onClick={() => showToast("تم حفظ الإعدادات (Demo)")}
          className="w-full sm:w-auto"
        >
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}
