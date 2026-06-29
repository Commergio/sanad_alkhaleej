import { categories } from "@/data/categories";
import { products } from "@/data/mock";
import { Card } from "@/components/ui/Card";
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
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">الأقسام</h1>
        <p className="text-slate-500 mt-1">إدارة أقسام منتجات الأسنان</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Package;
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <Card key={cat.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <Button variant="ghost" size="sm">
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="font-bold text-slate-800 mt-4">{cat.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
              <p className="text-sm font-medium text-sky-600 mt-3">
                {count} منتج
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
