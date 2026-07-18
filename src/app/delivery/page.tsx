"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDelivery } from "@/context/DeliveryContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Bike, Eye, EyeOff } from "lucide-react";

export default function DeliveryLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useDelivery();
  const { showToast } = useToast();
  const [username, setUsername] = useState("khaled");
  const [password, setPassword] = useState("1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/delivery/home");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(username.trim(), password);
      setLoading(false);
      if (ok) {
        showToast("مرحباً بك في تطبيق المندوب");
        router.push("/delivery/home");
      } else {
        showToast("بيانات الدخول غير صحيحة", "error");
      }
    }, 600);
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-48px)] flex flex-col justify-center p-6 animate-fade-in bg-gradient-to-b from-teal-50 via-white to-sky-50">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-500 to-sky-500 mx-auto flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4">
          <Bike className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">تطبيق المندوب</h1>
        <p className="text-sm text-slate-500 mt-2">
          سند الخليج للمعدات الطبية ومواد الأسنان
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="أدخل اسم المستخدم"
          required
        />
        <div className="relative">
          <Input
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-[38px] text-slate-400"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button type="submit" className="w-full !bg-teal-500 hover:!bg-teal-600" size="lg" disabled={loading}>
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>

      <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-100 text-center">
        <p className="text-xs text-slate-500 mb-2">حساب تجريبي للعرض</p>
        <p className="text-sm font-mono text-slate-700">khaled / 1234</p>
        <p className="text-[10px] text-slate-400 mt-2">
          أو: mohammed / fahad / abdullah — نفس كلمة المرور
        </p>
      </div>
    </div>
  );
}
