"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrdersContext";
import { useToast } from "@/context/ToastContext";
import { clinicAddresses } from "@/data/mock";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  MapPin,
  Truck,
  Zap,
  CheckCircle,
  Package,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showToast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState(
    clinicAddresses.find((a) => a.isDefault)?.id || clinicAddresses[0].id
  );
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = deliveryMethod === "express" ? 35 : 0;
  const grandTotal = total + deliveryFee;

  const address = clinicAddresses.find((a) => a.id === selectedAddress);

  const handleConfirm = () => {
    if (!address) return;

    const order = addOrder({
      customerId: "cust-1",
      customerName: "د. أحمد العتيبي",
      customerType: "doctor",
      city: address.city,
      phone: "0501234567",
      address: address.address,
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        sku: i.product.sku,
      })),
      total: grandTotal,
      deliveryMethod,
      estimatedDelivery: new Date(
        Date.now() + (deliveryMethod === "express" ? 2 : 4) * 3600000
      ).toISOString(),
    });

    setOrderNumber(order.orderNumber);
    setConfirmed(true);
    clearCart();
    showToast("تم تأكيد طلبك بنجاح!");
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="p-4 text-center py-16">
        <p className="text-slate-500">لا توجد منتجات في السلة</p>
        <Link href="/app/products" className="text-sky-600 text-sm mt-2 inline-block">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="p-6 text-center animate-slide-up min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">تم تأكيد الطلب!</h1>
        <p className="text-slate-500 mt-2">شكراً لطلبك من سند الخليج</p>

        <Card className="mt-6 p-6 w-full">
          <p className="text-sm text-slate-500">رقم الطلب</p>
          <p className="text-2xl font-bold text-sky-600 font-mono mt-1">
            {orderNumber}
          </p>
        </Card>

        <div className="flex flex-col gap-3 mt-6 w-full">
          <Button
            onClick={() =>
              router.push(`/app/orders/${orderNumber}/track`)
            }
          >
            <Package className="w-5 h-5" />
            تتبع الطلب
          </Button>
          <Link href="/app/orders">
            <Button variant="outline" className="w-full">
              عرض طلباتي
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <Link
        href="/app/cart"
        className="inline-flex items-center gap-1 text-sm text-sky-600 mb-4"
      >
        <ArrowRight className="w-4 h-4" />
        العودة للسلة
      </Link>

      <h1 className="text-xl font-bold text-slate-800 mb-6">إتمام الطلب</h1>

      {/* Address */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-sky-500" />
          <h2 className="font-bold text-slate-800">عنوان العيادة</h2>
        </div>
        <div className="space-y-2">
          {clinicAddresses.map((addr) => (
            <button
              key={addr.id}
              onClick={() => setSelectedAddress(addr.id)}
              className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                selectedAddress === addr.id
                  ? "border-sky-400 bg-sky-50"
                  : "border-slate-100 bg-white"
              }`}
            >
              <p className="font-semibold text-slate-800">{addr.label}</p>
              <p className="text-sm text-slate-500 mt-1">{addr.address}</p>
              <p className="text-xs text-slate-400 mt-0.5">{addr.city}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Delivery */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-5 h-5 text-teal-500" />
          <h2 className="font-bold text-slate-800">طريقة التوصيل</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDeliveryMethod("standard")}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              deliveryMethod === "standard"
                ? "border-teal-400 bg-teal-50"
                : "border-slate-100"
            }`}
          >
            <Truck className="w-6 h-6 mx-auto text-teal-500 mb-2" />
            <p className="font-semibold text-sm">عادي</p>
            <p className="text-xs text-slate-500 mt-1">مجاني — 4 ساعات</p>
          </button>
          <button
            onClick={() => setDeliveryMethod("express")}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              deliveryMethod === "express"
                ? "border-amber-400 bg-amber-50"
                : "border-slate-100"
            }`}
          >
            <Zap className="w-6 h-6 mx-auto text-amber-500 mb-2" />
            <p className="font-semibold text-sm">سريع</p>
            <p className="text-xs text-slate-500 mt-1">35 ر.س — ساعتين</p>
          </button>
        </div>
      </section>

      {/* Summary */}
      <Card className="p-4 mb-6">
        <h3 className="font-bold text-slate-800 mb-3">ملخص الطلب</h3>
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between text-sm py-2 border-b border-slate-50"
          >
            <span className="text-slate-600">
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-medium">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
        <div className="flex justify-between text-sm py-2">
          <span className="text-slate-500">رسوم التوصيل</span>
          <span>{deliveryFee ? formatPrice(deliveryFee) : "مجاني"}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <span>الإجمالي</span>
          <span className="text-sky-600">{formatPrice(grandTotal)}</span>
        </div>
      </Card>

      <Button className="w-full" size="lg" onClick={handleConfirm}>
        تأكيد الطلب
      </Button>
    </div>
  );
}
