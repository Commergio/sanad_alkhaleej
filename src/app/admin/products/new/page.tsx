"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { manufacturersList } from "@/data/mock";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/context/ToastContext";
import { ArrowRight, Image } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("تم إضافة المنتج بنجاح (Demo)");
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-sky-600 mb-4"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للمنتجات
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 mb-6">إضافة منتج جديد</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5 space-y-4">
              <Input label="اسم المنتج" placeholder="مثال: إبرة أسنان Gauge 27" required />
              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="القسم"
                  options={[
                    { value: "", label: "اختر القسم" },
                    ...categories.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                  required
                />
                <Select
                  label="الشركة المصنعة"
                  options={[
                    { value: "", label: "اختر الشركة" },
                    ...manufacturersList.map((m) => ({ value: m, label: m })),
                  ]}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="SKU" placeholder="NDL-27-L-SEP-20" required />
                <Input label="Barcode" placeholder="6281002003001" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="السعر (ر.س)" type="number" placeholder="0.00" required />
                <Input label="الكمية" type="number" placeholder="0" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  الوصف
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 min-h-[100px]"
                  placeholder="وصف المنتج..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  المواصفات
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 min-h-[80px]"
                  placeholder="Gauge: 27, Length: 25mm, ..."
                />
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                صورة المنتج
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-sky-300 transition-colors cursor-pointer">
                <Image className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">اسحب الصورة أو انقر للرفع</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG حتى 5MB</p>
              </div>
            </Card>

            <Card className="p-5">
              <Select
                label="الحالة"
                options={[
                  { value: "available", label: "متوفر" },
                  { value: "unavailable", label: "غير متوفر" },
                  { value: "low_stock", label: "مخزون منخفض" },
                ]}
                defaultValue="available"
              />
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "جاري الحفظ..." : "حفظ المنتج"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
