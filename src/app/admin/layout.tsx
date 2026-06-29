"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  ClipboardList,
  Users,
  Truck,
  UserCheck,
  Warehouse,
  BarChart3,
  Settings,
  Stethoscope,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoNav } from "@/components/DemoNav";
import { useState } from "react";

const sidebarItems = [
  { href: "/admin", icon: LayoutDashboard, label: "الرئيسية" },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/categories", icon: Grid3X3, label: "الأقسام" },
  { href: "/admin/orders", icon: ClipboardList, label: "الطلبات" },
  { href: "/admin/customers", icon: Users, label: "العملاء" },
  { href: "/admin/delivery", icon: Truck, label: "التوصيل" },
  { href: "/admin/drivers", icon: UserCheck, label: "المندوبين" },
  { href: "/admin/inventory", icon: Warehouse, label: "المخزون" },
  { href: "/admin/reports", icon: BarChart3, label: "التقارير" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 right-0 h-screen w-64 bg-white border-l border-slate-200 z-50 transition-transform duration-300 flex flex-col",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">سند الخليج</p>
                <p className="text-[10px] text-slate-400">لوحة التحكم</p>
              </div>
            </div>
            <button
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-sky-600"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <p className="text-sm text-slate-500 hidden sm:block">
                سند الخليج للمعدات الطبية ومواد الأسنان
              </p>
            </div>
            <DemoNav current="admin" className="!shadow-sm scale-90" />
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
