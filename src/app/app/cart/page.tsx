"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="السلة فارغة"
        description="أضف منتجات من القائمة لبدء الطلب"
        action={
          <Link href="/app/products">
            <Button>تصفح المنتجات</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-xl font-bold text-slate-800 mb-4">سلة المشتريات</h1>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-3 p-3 rounded-2xl border border-slate-100 bg-white"
          >
            <ProductImage product={item.product} size="sm" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-slate-800 line-clamp-2">
                {item.product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.product.manufacturer}
              </p>
              <p className="text-sm font-bold text-sky-600 mt-1">
                {formatPrice(item.product.price)}
              </p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-slate-50">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>الإجمالي</span>
          <span className="text-sky-600">{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/app/checkout" className="block mt-4">
        <Button className="w-full" size="lg">
          متابعة الدفع
        </Button>
      </Link>
    </div>
  );
}
