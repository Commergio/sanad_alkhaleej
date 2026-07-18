import Link from "next/link";
import {
  Smartphone,
  LayoutDashboard,
  Warehouse,
  Bike,
  BarChart3,
  ArrowLeft,
  ArrowDown,
  Stethoscope,
} from "lucide-react";
import { DemoNav } from "@/components/DemoNav";
import { Button } from "@/components/ui/Button";

const systems = [
  {
    href: "/app",
    icon: Smartphone,
    title: "تطبيق العميل",
    titleEn: "Customer App",
    desc: "واجهة الأطباء والعيادات لطلب المنتجات وتتبع الطلبات",
    color: "from-sky-500 to-sky-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
  },
  {
    href: "/admin",
    icon: LayoutDashboard,
    title: "لوحة التحكم",
    titleEn: "Admin Dashboard",
    desc: "إدارة المنتجات والطلبات والعملاء والمخزون من مكان واحد",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    href: "/admin/inventory",
    icon: Warehouse,
    title: "المستودع",
    titleEn: "Warehouse",
    desc: "تجهيز الطلبات ومتابعة المخزون والمنتجات منخفضة الكمية",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    href: "/delivery",
    icon: Bike,
    title: "تطبيق المندوب",
    titleEn: "Delivery Driver",
    desc: "استقبال الطلبات والتنقل والتسليم مع تحديث الحالة لحظياً",
    color: "from-teal-500 to-emerald-500",
    bg: "bg-teal-50",
    text: "text-teal-700",
  },
  {
    href: "/admin/reports",
    icon: BarChart3,
    title: "التقارير",
    titleEn: "Reports",
    desc: "تحليلات المبيعات والأداء والمخزون لاتخاذ قرارات أسرع",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
];

export default function SystemOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">سند الخليج</p>
              <p className="text-xs text-slate-500">نظرة عامة على النظام</p>
            </div>
          </Link>
          <DemoNav current="landing" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            نظرة عامة على النظام
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            منصة SaaS متكاملة لإدارة أعمال توزيع منتجات ومعدات الأسنان —
            ليست مجرد متجر إلكتروني، بل نظام تشغيل كامل للشركة.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="space-y-0 mb-16">
          {systems.map((sys, i) => {
            const Icon = sys.icon;
            return (
              <div key={sys.titleEn} className="flex flex-col items-center">
                <Link href={sys.href} className="w-full max-w-md">
                  <div
                    className={`relative p-6 rounded-2xl border-2 border-white shadow-lg hover:shadow-xl transition-all ${sys.bg} animate-slide-up`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sys.color} flex items-center justify-center shadow-md shrink-0`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          {sys.titleEn}
                        </p>
                        <h2 className={`text-lg font-bold ${sys.text}`}>
                          {sys.title}
                        </h2>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          {sys.desc}
                        </p>
                      </div>
                      <ArrowLeft className={`w-5 h-5 shrink-0 ${sys.text}`} />
                    </div>
                  </div>
                </Link>
                {i < systems.length - 1 && (
                  <div className="flex flex-col items-center py-2">
                    <div className="w-0.5 h-4 bg-slate-300" />
                    <ArrowDown className="w-5 h-5 text-slate-400" />
                    <div className="w-0.5 h-4 bg-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Relationship note */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-3">
            كيف تعمل الأنظمة معاً؟
          </h3>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            يطلب الطبيب من تطبيق العميل → تستقبل لوحة التحكم الطلب → يُجهَّز من
            المستودع → يُعيَّن مندوب → يسلّم عبر تطبيق المندوب → تُحدَّث التقارير
            تلقائياً. كل جزء يغذي الآخر في دورة عمل واحدة.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/app">
              <Button size="sm">تطبيق العميل</Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" variant="outline">
                لوحة التحكم
              </Button>
            </Link>
            <Link href="/delivery">
              <Button size="sm" className="!bg-teal-500 hover:!bg-teal-600">
                تطبيق المندوب
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
