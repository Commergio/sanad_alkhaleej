import Link from "next/link";
import { Home, LayoutDashboard, Smartphone, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoNavProps {
  current?: "landing" | "app" | "admin" | "delivery";
  className?: string;
}

export function DemoNav({ current, className }: DemoNavProps) {
  const links = [
    { href: "/", label: "الرئيسية", icon: Home, key: "landing" as const },
    { href: "/app", label: "العميل", icon: Smartphone, key: "app" as const },
    { href: "/admin", label: "الإدارة", icon: LayoutDashboard, key: "admin" as const },
    { href: "/delivery", label: "المندوب", icon: Bike, key: "delivery" as const },
  ];

  return (
    <nav
      className={cn(
        "flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg",
        className
      )}
    >
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = current === link.key;
        return (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all",
              isActive
                ? "bg-sky-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
