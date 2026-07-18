"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { DeliveryProvider } from "@/context/DeliveryContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ToastProvider>
        <OrdersProvider>
          <DeliveryProvider>{children}</DeliveryProvider>
        </OrdersProvider>
      </ToastProvider>
    </CartProvider>
  );
}
