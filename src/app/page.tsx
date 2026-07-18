import Link from "next/link";
import {
  Package,
  Search,
  Truck,
  MapPin,
  BarChart3,
  Shield,
  ArrowLeft,
  Stethoscope,
  Bike,
  LayoutDashboard,
  Smartphone,
  ClipboardCheck,
  Warehouse,
  UserCheck,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { DemoNav } from "@/components/DemoNav";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: Package,
    title: "منتجات كثيرة ومنظمة",
    desc: "آلاف المنتجات مصنّفة حسب التخصص الطبي",
  },
  {
    icon: Search,
    title: "بحث سريع وفلاتر ذكية",
    desc: "ابحث بالـ SKU أو المقاس أو الشركة المصنعة",
  },
  {
    icon: Truck,
    title: "طلبات وتوصيل سريع",
    desc: "اطلب من عيادتك واستلم في موقعك",
  },
  {
    icon: MapPin,
    title: "تتبع الطلب لحظياً",
    desc: "تابع حالة طلبك من التجهيز حتى التسليم",
  },
  {
    icon: BarChart3,
    title: "لوحة تحكم متكاملة",
    desc: "إدارة المنتجات والطلبات والتوصيل من مكان واحد",
  },
  {
    icon: Shield,
    title: "منصة متخصصة B2B",
    desc: "للأطباء والعيادات فقط — ليست متجراً عاماً",
  },
];

const workflowSteps = [
  { icon: Stethoscope, label: "الطبيب", desc: "يفتح التطبيق" },
  { icon: Search, label: "يبحث عن المنتج", desc: "فلاتر وSKU" },
  { icon: ShoppingCart, label: "يضيف إلى السلة", desc: "يختار الكمية" },
  { icon: CheckCircle2, label: "يؤكد الطلب", desc: "يختار العنوان" },
  { icon: LayoutDashboard, label: "لوحة التحكم", desc: "تستقبل الطلب" },
  { icon: ClipboardCheck, label: "مراجعة الطلب", desc: "الموظف يراجع" },
  { icon: Warehouse, label: "تجهيز المنتجات", desc: "من المستودع" },
  { icon: UserCheck, label: "تعيين مندوب", desc: "اختيار المندوب" },
  { icon: Bike, label: "المندوب يستلم", desc: "من المستودع" },
  { icon: Truck, label: "في الطريق", desc: "تتبع حي" },
  { icon: MapPin, label: "تسليم الطلب", desc: "في العيادة" },
  { icon: CheckCircle2, label: "تأكيد الاستلام", desc: "اكتمال الدورة" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-slate-800 text-sm">سند الخليج</p>
              <p className="text-xs text-slate-500">للمعدات الطبية ومواد الأسنان</p>
            </div>
          </div>
          <DemoNav current="landing" />
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.07]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            منصة SaaS متكاملة لإدارة توزيع منتجات الأسنان
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            منصة سند الخليج
            <br />
            <span className="bg-gradient-to-l from-sky-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              لمنتجات الأسنان
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            اطلب منتجات ومعدات الأسنان بسهولة، تابع طلبك، واستلم في موقعك.
            منصة واحدة تربط الأطباء والعيادات بالإدارة والمستودع والمندوبين.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 flex-wrap">
            <Link href="/app">
              <Button size="lg" className="min-w-[180px]">
                <Smartphone className="w-5 h-5" />
                تطبيق العميل
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="min-w-[180px]">
                <LayoutDashboard className="w-5 h-5" />
                لوحة التحكم
              </Button>
            </Link>
            <Link href="/delivery">
              <Button
                size="lg"
                className="min-w-[180px] !bg-teal-500 hover:!bg-teal-600"
              >
                <Bike className="w-5 h-5" />
                تطبيق المندوب
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-sm">
            <Link href="/system-overview" className="text-sky-600 hover:underline">
              نظرة عامة على النظام
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/why" className="text-sky-600 hover:underline">
              لماذا هذه المنصة؟
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-12 px-4 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 leading-relaxed text-lg">
            <strong className="text-slate-800">سند الخليج</strong> ليست متجراً عاماً —
            بل منصة متخصصة لمنتجات ومعدات الأسنان تساعد{" "}
            <strong className="text-sky-600">الأطباء والعيادات والمراكز</strong> على
            الطلب السريع، وتساعد الشركة على إدارة المنتجات والطلبات والتوصيل من مكان
            واحد.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            رحلة الطلب الكاملة
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            من لحظة طلب الطبيب حتى تأكيد التسليم — دورة عمل مترابطة عبر تطبيق العميل ولوحة التحكم وتطبيق المندوب
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 h-full hover:shadow-md hover:border-sky-100 transition-all animate-slide-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-sky-600" />
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">{step.label}</h3>
                    <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -left-2 w-4 h-0.5 bg-sky-200 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            مزايا المنصة
          </h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            تجربة طلب وتوصيل تشبه تطبيقات التوصيل الحديثة، مصممة خصيصاً لقطاع الأسنان
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl gradient-card border border-slate-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Four systems */}
      <section className="py-16 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-10">
            أربعة واجهات — نظام واحد
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/app", icon: Smartphone, title: "تطبيق العميل", color: "sky" },
              { href: "/admin", icon: LayoutDashboard, title: "لوحة التحكم", color: "blue" },
              { href: "/delivery", icon: Bike, title: "تطبيق المندوب", color: "teal" },
              { href: "/system-overview", icon: BarChart3, title: "نظرة النظام", color: "emerald" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-md hover:border-sky-200 transition-all text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-sky-600" />
                    </div>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="text-xs text-sky-600 mt-2 flex items-center justify-center gap-1">
                      استكشاف
                      <ArrowLeft className="w-3 h-3" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center gradient-hero rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-sky-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            جاهز لاستكشاف المنصة؟
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            عرض تجريبي يوضح دورة العمل الكاملة: طلب → إدارة → تجهيز → توصيل → تسليم
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link href="/app">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 min-w-[160px]">
                تطبيق العميل
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 min-w-[160px]">
                لوحة التحكم
              </Button>
            </Link>
            <Link href="/delivery">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 min-w-[160px]">
                تطبيق المندوب
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">
            سند الخليج للمعدات الطبية ومواد الأسنان
          </p>
          <p className="mt-1">عرض تجريبي — Demo Frontend · منصة SaaS متكاملة</p>
        </div>
      </footer>
    </div>
  );
}
