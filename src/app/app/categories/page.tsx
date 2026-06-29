"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import {
  Syringe,
  Layers,
  ShieldCheck,
  Hand,
  Wrench,
  Cpu,
  Sparkles,
  Scan,
  Scissors,
  Package,
  ChevronLeft,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const iconMap: Record<string, React.ElementType> = {
  Syringe,
  Layers,
  ShieldCheck,
  Hand,
  Wrench,
  Cpu,
  Sparkles,
  Scan,
  Scissors,
  Package,
};

export default function CategoriesPage() {
  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-800 mb-1">الأقسام</h1>
      <p className="text-sm text-slate-500 mb-6">
        تصفح منتجات الأسنان حسب التخصص
      </p>

      <div className="space-y-3">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Package;
          return (
            <Link key={cat.id} href={`/app/products?category=${cat.id}`}>
              <Card hover className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                  <p className="text-xs text-sky-600 mt-1 font-medium">
                    {cat.productCount}+ منتج
                  </p>
                </div>
                <ChevronLeft className="w-5 h-5 text-slate-300 shrink-0" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
