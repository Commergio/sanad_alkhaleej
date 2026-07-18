export type CategoryId =
  | "needles"
  | "filling"
  | "sterilization"
  | "gloves"
  | "clinic-tools"
  | "dental-devices"
  | "whitening"
  | "xray"
  | "surgery"
  | "consumables";

export type OrderStatus =
  | "new"
  | "assigned"
  | "accepted"
  | "preparing"
  | "picked_up"
  | "out_for_delivery"
  | "arrived"
  | "delivered"
  | "cancelled";

export type CustomerType = "doctor" | "clinic" | "center" | "hospital";

export type ProductStatus = "available" | "unavailable" | "low_stock";

export interface Category {
  id: CategoryId;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface ProductSpecs {
  gauge?: string;
  length?: string;
  piecesPerPack?: number;
  usage?: string;
  color?: string;
  size?: string;
  type?: string;
  material?: string;
  shade?: string;
  volume?: string;
  [key: string]: string | number | undefined;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  categoryId: CategoryId;
  manufacturer: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  status: ProductStatus;
  imageColor: string;
  specs: ProductSpecs;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  phone: string;
  city: string;
  address: string;
  orderCount: number;
  lastOrderDate: string;
  email: string;
}

export interface DeliveryAgent {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: "available" | "busy" | "offline";
  activeOrders: number;
  employeeId: string;
  avatarColor: string;
  isOnline: boolean;
  rating: number;
  totalOrders: number;
  totalDistance: number;
  avgDeliveryMinutes: number;
  todayOrders: number;
  todayDelivered: number;
  username: string;
  password: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerType: CustomerType;
  doctorName?: string;
  city: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAgentId?: string;
  deliveryAgentName?: string;
  estimatedDelivery?: string;
  deliveryMethod: "standard" | "express";
  distanceKm?: number;
  etaMinutes?: number;
  notes?: string;
}

export interface ClinicAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
}

export type DriverNotificationType =
  | "new_order"
  | "address_changed"
  | "customer_called"
  | "order_cancelled"
  | "order_delivered";

export interface DriverNotification {
  id: string;
  type: DriverNotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  orderNumber?: string;
}
