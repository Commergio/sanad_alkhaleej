import { Package } from "lucide-react";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-20 w-20",
  md: "h-32 w-32",
  lg: "h-48 w-48",
};

export function ProductImage({ product, size = "md", className }: ProductImageProps) {
  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${product.imageColor}22 0%, ${product.imageColor}44 100%)`,
      }}
    >
      <div
        className="w-1/2 h-1/2 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${product.imageColor}33` }}
      >
        <Package className="w-1/2 h-1/2" style={{ color: product.imageColor }} />
      </div>
    </div>
  );
}
