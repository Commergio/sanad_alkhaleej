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
  | "preparing"
  | "out_for_delivery"
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
}

export interface ClinicAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
}
