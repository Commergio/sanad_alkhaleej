import { OrderStatus } from "@/types";

export type BadgeVariant =
  | "info"
  | "warning"
  | "success"
  | "danger"
  | "default";

export const orderStatusVariant: Record<OrderStatus, BadgeVariant> = {
  new: "info",
  assigned: "info",
  accepted: "info",
  preparing: "warning",
  picked_up: "warning",
  out_for_delivery: "default",
  arrived: "default",
  delivered: "success",
  cancelled: "danger",
};

export function getActiveDeliveryOrders(statuses: OrderStatus[]) {
  return statuses.filter(
    (s) =>
      s !== "delivered" &&
      s !== "cancelled" &&
      s !== "new"
  );
}
