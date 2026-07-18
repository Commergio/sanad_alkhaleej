import Link from "next/link";
import {
  Zap,
  Search,
  Warehouse,
  Users,
  ClipboardList,
  Truck,
  LayoutDashboard,
  BarChart3,
  Expand,
  Smartphone,
  Stethoscope,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { DemoNav } from "@/components/DemoNav";
import { Button } from "@/components/ui/Button";

const benefits = [
  {
    icon: Zap,
    title: "سهولة الطلب",
    desc: "تجربة طلب سريعة تشبه تطبيقات التوصيل، مصممة خصيصاً للأطباء والعيادات دون تعقيد.",
  },
  {
    icon: Search,
    title: "بحث سريع داخل آلاف المنتجات",
    desc: "فلاتر قوية حسب القسم، الشركة، Gauge، المقاس، SKU، والتوفر — حتى مع كتالوج ضخم مثل الإبر.",
  },
  {
    icon: Warehouse,
    title: "إدارة المخزون",
    desc: "متابعة الكميات، تنبيهات المخزون المنخفض، وحالة التوفر لحظياً لكل منتج.",
  },
  {
    icon: Users,
    title: "إدارة العملاء",
    desc: "قاعدة بيانات للأطباء والعيادات والمراكز والمستشفيات مع سجل الطلبات.",
  },
  {
    icon: ClipboardList,
    title: "إدارة الطلبات",
    desc: "من الاستلام إلى التسليم — حالات واضحة، تفاصيل كاملة، وإمكانية تغيير الحالة فوراً.",
  },
  {
    icon: Truck,
    title: "إدارة التوصيل",
    desc: "تعيين المندوبين، متابعة التوصيل، وتطبيق مندوب مستقل لإكمال الدورة.",
  },
  {
    icon: LayoutDashboard,
    title: "لوحة تحكم موحدة",
    desc: "كل عمليات الشركة في واجهة واحدة: منتجات، طلبات، عملاء، مخزون، توصيل، وتقارير.",
  },
  {
    icon: BarChart3,
    title: "تقارير لحظية",
    desc: "أكثر المنتجات طلباً، المبيعات حسب الأقسام، أداء العملاء، والمنتجات منخفضة المخزون.",
  },
  {
    icon: Expand,
    title: "سهولة التوسع",
    desc: "بنية جاهزة لإضافة مدن، مندوبين، وفروع جديدة دون إعادة بناء النظام.",
  },
  {
    icon: Smartphone,
    title: "جاهزية للتطبيقات المستقبلية",
    desc: "واجهة العميل والمندوب مصممة كـ Mobile-first — جاهزة للتحول إلى تطبيقات جوال لاحقاً.",
  },
];

export default function WhyPlatformPage() {
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
              <p className="text-xs text-slate-500">لماذا هذه المنصة؟</p>
            </div>
          </Link>
          <DemoNav current="landing" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-14 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            منصة تشغيل أعمال — وليست مجرد متجر
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            لماذا منصة سند الخليج؟
          </h1>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
            لأن شركة توزيع منتجات ومعدات الأسنان تحتاج نظاماً يدير الطلبات والمخزون
            والتوصيل والعملاء معاً — وليس صفحة بيع فقط.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:border-sky-100 transition-all animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-teal-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="font-bold text-slate-800 text-lg mb-2">{b.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="gradient-hero rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-sky-500/20">
          <h2 className="text-2xl font-bold mb-3">
            منصة متكاملة لإدارة أعمال التوزيع
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
            تطبيق عميل + لوحة تحكم + مستودع + مندوب + تقارير —
            دورة عمل كاملة جاهزة للعرض والتطوير.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/system-overview">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
                نظرة عامة على النظام
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/delivery">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                جرّب تطبيق المندوب
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
