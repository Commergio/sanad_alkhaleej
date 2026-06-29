"use client";

import Link from "next/link";
import { Product } from "@/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { productStatusLabels } from "@/data/mock";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingCart, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const statusVariant =
    product.status === "available"
      ? "success"
      : product.status === "low_stock"
        ? "warning"
        : "danger";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.status === "unavailable") {
      showToast("المنتج غير متوفر حالياً", "warning");
      return;
    }
    addToCart(product);
    showToast(`تمت إضافة ${product.name} إلى السلة`);
  };

  return (
    <Link href={`/app/products/${product.id}`}>
      <Card hover className="overflow-hidden h-full animate-fade-in">
        <div className={compact ? "p-3" : "p-4"}>
          <div className="flex gap-3">
            <ProductImage product={product} size={compact ? "sm" : "md"} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">
                  {product.name}
                </h3>
                <Badge variant={statusVariant} className="shrink-0">
                  {productStatusLabels[product.status]}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">{product.manufacturer}</p>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                SKU: {product.sku}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-sky-600">
                  {formatPrice(product.price)}
                </span>
                <Button
                  size="sm"
                  onClick={handleAdd}
                  disabled={product.status === "unavailable"}
                  className="!px-3"
                >
                  <Plus className="w-4 h-4" />
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
