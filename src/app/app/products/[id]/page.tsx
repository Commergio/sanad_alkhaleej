"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getSimilarProducts, productStatusLabels } from "@/data/mock";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/customer/ProductCard";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (!product) notFound();

  const similar = getSimilarProducts(product);
  const statusVariant =
    product.status === "available"
      ? "success"
      : product.status === "low_stock"
        ? "warning"
        : "danger";

  const handleAdd = () => {
    if (product.status === "unavailable") {
      showToast("المنتج غير متوفر حالياً", "warning");
      return;
    }
    addToCart(product, quantity);
    showToast(`تمت إضافة ${quantity} قطعة إلى السلة`);
  };

  return (
    <div className="animate-fade-in">
      <div className="p-4">
        <Link
          href="/app/products"
          className="inline-flex items-center gap-1 text-sm text-sky-600 mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للمنتجات
        </Link>

        <div className="flex justify-center mb-6">
          <ProductImage product={product} size="lg" className="!w-full !h-56" />
        </div>

        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-bold text-slate-800">{product.name}</h1>
          <Badge variant={statusVariant}>
            {productStatusLabels[product.status]}
          </Badge>
        </div>

        <p className="text-sm text-slate-500 mt-1">{product.manufacturer}</p>

        <div className="flex items-center gap-4 mt-4 p-3 rounded-xl bg-slate-50 text-sm">
          <div>
            <p className="text-slate-400 text-xs">SKU</p>
            <p className="font-mono font-medium">{product.sku}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Barcode</p>
            <p className="font-mono font-medium">{product.barcode}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs">المتوفر</p>
            <p className="font-medium">{product.stock} قطعة</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-sky-600 mt-4">
          {formatPrice(product.price)}
        </p>

        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          {product.description}
        </p>

        {/* Specs */}
        <div className="mt-6">
          <h3 className="font-bold text-slate-800 mb-3">المواصفات</h3>
          <div className="space-y-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-slate-50 text-sm"
              >
                <span className="text-slate-500">{key}</span>
                <span className="font-medium text-slate-700">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity & Add */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            className="flex-1"
            onClick={handleAdd}
            disabled={product.status === "unavailable"}
          >
            <ShoppingCart className="w-5 h-5" />
            أضف للسلة
          </Button>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="p-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3">منتجات مشابهة</h3>
          <div className="space-y-3">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
