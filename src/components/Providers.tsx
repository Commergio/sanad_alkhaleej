"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { OrdersProvider } from "@/context/OrdersContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </ToastProvider>
    </CartProvider>
  );
}
