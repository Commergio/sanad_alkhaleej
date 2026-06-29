import Link from "next/link";
import { Home, LayoutDashboard, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoNavProps {
  current?: "landing" | "app" | "admin";
  className?: string;
}

export function DemoNav({ current, className }: DemoNavProps) {
  const links = [
    { href: "/", label: "الرئيسية", icon: Home, key: "landing" as const },
    { href: "/app", label: "تطبيق العميل", icon: Smartphone, key: "app" as const },
    { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard, key: "admin" as const },
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
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
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
