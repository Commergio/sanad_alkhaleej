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

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">سند الخليج</p>
              <p className="text-xs text-slate-500">للمعدات الطبية ومواد الأسنان</p>
            </div>
          </div>
          <DemoNav current="landing" />
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.07]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-sm font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            منصة B2B متخصصة لقطاع الأسنان
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
            منصة واحدة تربط الأطباء والعيادات بإدارة المنتجات والطلبات والتوصيل.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link href="/app">
              <Button size="lg" className="min-w-[200px]">
                استعراض تطبيق العميل
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                دخول لوحة التحكم
              </Button>
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
                  className="p-6 rounded-2xl gradient-card border border-slate-100 hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
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

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center gradient-hero rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-sky-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            جاهز لاستكشاف المنصة؟
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            هذا عرض تجريبي (Demo) يوضح كيف ستعمل المنصة الكاملة لسند الخليج
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-white text-sky-600 hover:bg-sky-50 min-w-[180px]"
              >
                تطبيق العميل
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 min-w-[180px]"
              >
                لوحة التحكم
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-500">
          <p className="font-semibold text-slate-700">
            سند الخليج للمعدات الطبية ومواد الأسنان
          </p>
          <p className="mt-1">عرض تجريبي — Demo Frontend</p>
        </div>
      </footer>
    </div>
  );
}
