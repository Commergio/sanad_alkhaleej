"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  Map,
  Bell,
  User,
  ArrowRight,
  Bike,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDelivery } from "@/context/DeliveryContext";
import { DemoNav } from "@/components/DemoNav";

const navItems = [
  { href: "/delivery/home", icon: Home, label: "الرئيسية" },
  { href: "/delivery/orders", icon: ClipboardList, label: "الطلبات" },
  { href: "/delivery/map", icon: Map, label: "الخريطة" },
  { href: "/delivery/notifications", icon: Bell, label: "الإشعارات" },
  { href: "/delivery/profile", icon: User, label: "الحساب" },
];

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useDelivery();
  const isLoginPage = pathname === "/delivery" || pathname === "/delivery/";

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      router.replace("/delivery");
    }
    if (isLoginPage && isAuthenticated) {
      router.replace("/delivery/home");
    }
  }, [isAuthenticated, isLoginPage, router]);

  const showBottomNav = isAuthenticated && !isLoginPage;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-white border-b border-slate-200 px-4 py-2">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-sky-600"
          >
            <ArrowRight className="w-3 h-3" />
            العودة للرئيسية
          </Link>
          <DemoNav current="delivery" className="!shadow-sm !p-0.5 scale-90" />
        </div>
      </div>

      <div className="max-w-lg mx-auto min-h-[calc(100vh-48px)] bg-white shadow-2xl relative flex flex-col">
        {!isLoginPage && (
          <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center shrink-0">
                <Bike className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-800 truncate">
                  تطبيق المندوب
                </p>
                <p className="text-[10px] text-slate-400">سند الخليج للتوصيل</p>
              </div>
            </div>
          </header>
        )}

        <main className={cn("flex-1 overflow-y-auto", showBottomNav && "pb-20")}>
          {children}
        </main>

        {showBottomNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-slate-100 z-50">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                      isActive ? "text-teal-600" : "text-slate-400"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
