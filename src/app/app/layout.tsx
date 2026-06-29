"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  ClipboardList,
  User,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { DemoNav } from "@/components/DemoNav";

const navItems = [
  { href: "/app", icon: Home, label: "الرئيسية" },
  { href: "/app/categories", icon: Grid3X3, label: "الأقسام" },
  { href: "/app/cart", icon: ShoppingCart, label: "السلة" },
  { href: "/app/orders", icon: ClipboardList, label: "الطلبات" },
  { href: "/app/profile", icon: User, label: "حسابي" },
];

export default function CustomerAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const hideNav =
    pathname.includes("/checkout") ||
    pathname.includes("/track");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar for demo navigation */}
      <div className="bg-white border-b border-slate-200 px-4 py-2">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-sky-600"
          >
            <ArrowRight className="w-3 h-3" />
            العودة للرئيسية
          </Link>
          <DemoNav current="app" className="!shadow-sm !p-0.5 scale-90" />
        </div>
      </div>

      {/* Mobile frame */}
      <div className="max-w-lg mx-auto min-h-[calc(100vh-48px)] bg-white shadow-2xl relative flex flex-col">
        {/* App header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-800 truncate">
                سند الخليج
              </p>
              <p className="text-[10px] text-slate-400">
                منتجات ومعدات الأسنان
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>

        {/* Bottom nav */}
        {!hideNav && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t border-slate-100 z-50">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/app"
                    ? pathname === "/app"
                    : pathname.startsWith(item.href);
                const isCart = item.href === "/app/cart";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all relative",
                      isActive ? "text-sky-600" : "text-slate-400"
                    )}
                  >
                    <div className="relative">
                      <Icon className="w-5 h-5" />
                      {isCart && itemCount > 0 && (
                        <span className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {itemCount > 9 ? "9+" : itemCount}
                        </span>
                      )}
                    </div>
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
