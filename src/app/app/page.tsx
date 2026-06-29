"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProductCard } from "@/components/customer/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/mock";
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
  TrendingUp,
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

export default function AppHomePage() {
  const [search, setSearch] = useState("");

  const featured = products.filter((p) => p.status === "available").slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Search */}
      <div className="p-4 bg-gradient-to-b from-sky-50 to-white">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="ابحث عن منتج، SKU، شركة مصنعة..."
        />
        {search && (
          <Link
            href={`/app/products?q=${encodeURIComponent(search)}`}
            className="block mt-2 text-center text-sm text-sky-600 font-medium"
          >
            عرض نتائج البحث عن &quot;{search}&quot;
          </Link>
        )}
      </div>

      {/* Banner */}
      <div className="mx-4 mb-4 p-4 rounded-2xl gradient-hero text-white">
        <p className="text-xs opacity-80">منصة متخصصة B2B</p>
        <p className="font-bold mt-1">اطلب مستلزمات عيادتك بسرعة</p>
        <p className="text-xs opacity-80 mt-1">
          ليس متجراً عاماً — مخصص للأطباء والعيادات
        </p>
      </div>

      {/* Categories */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800">الأقسام</h2>
          <Link
            href="/app/categories"
            className="text-xs text-sky-600 flex items-center gap-1"
          >
            عرض الكل
            <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {categories.slice(0, 10).map((cat) => {
            const Icon = iconMap[cat.icon] || Package;
            return (
              <Link key={cat.id} href={`/app/products?category=${cat.id}`}>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-sky-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className="text-[10px] text-slate-600 text-center leading-tight font-medium">
                    {cat.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-teal-500" />
          <h2 className="font-bold text-slate-800">الأكثر طلباً</h2>
        </div>
        <div className="space-y-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="px-4 pb-4">
        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            وصول سريع
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/app/products?category=needles"
              className="p-3 rounded-xl bg-sky-50 text-center text-sm font-medium text-sky-700 hover:bg-sky-100 transition-colors"
            >
              الإبر
            </Link>
            <Link
              href="/app/products?category=gloves"
              className="p-3 rounded-xl bg-teal-50 text-center text-sm font-medium text-teal-700 hover:bg-teal-100 transition-colors"
            >
              القفازات
            </Link>
            <Link
              href="/app/products?category=filling"
              className="p-3 rounded-xl bg-emerald-50 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              مواد الحشو
            </Link>
            <Link
              href="/app/orders"
              className="p-3 rounded-xl bg-violet-50 text-center text-sm font-medium text-violet-700 hover:bg-violet-100 transition-colors"
            >
              طلباتي
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
