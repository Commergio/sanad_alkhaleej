import { Product, Customer, DeliveryAgent, Order, ClinicAddress } from "@/types";

const manufacturers = [
  "Septodont",
  "Dentsply Sirona",
  "3M ESPE",
  "Kerr",
  "Ultradent",
  "GC Corporation",
  "Ivoclar Vivadent",
  "Hu-Friedy",
  "Medicom",
  "Ansell",
  "NSK",
  "Woodpecker",
  "Meta Biomed",
  "SDI",
  "Voco",
];

const imageColors = [
  "#0EA5E9",
  "#06B6D4",
  "#14B8A6",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#0D9488",
  "#0891B2",
  "#2563EB",
];

function needleProducts(): Product[] {
  const gauges = ["25", "27", "30", "31"];
  const lengths = ["Short", "Long", "Extra Long"];
  const colors = ["أزرق", "أحمر", "أصفر", "أخضر", "برتقالي"];
  const usages = ["تخدير", "ريتروجراد", "بلب", "عام"];
  const pieces = [20, 50, 100];
  const products: Product[] = [];
  let idx = 1;

  for (const gauge of gauges) {
    for (const length of lengths) {
      for (const mfr of manufacturers.slice(0, 4)) {
        for (const piecesCount of pieces.slice(0, 2)) {
          const color = colors[idx % colors.length];
          const usage = usages[idx % usages.length];
          const id = `needle-${idx}`;
          products.push({
            id,
            name: `إبرة أسنان ${mfr} Gauge ${gauge} ${length === "Short" ? "قصيرة" : length === "Long" ? "طويلة" : "طويلة جداً"}`,
            nameEn: `Dental Needle ${mfr} Gauge ${gauge} ${length}`,
            description: `إبرة أسنان عالية الجودة من ${mfr}، مقاس Gauge ${gauge}، طول ${length}، مناسبة لـ${usage}. تعبئة ${piecesCount} إبرة مع غطاء واقي.`,
            categoryId: "needles",
            manufacturer: mfr,
            sku: `NDL-${gauge}-${length.slice(0, 1)}-${mfr.slice(0, 3).toUpperCase()}-${piecesCount}`,
            barcode: `628${String(1000000 + idx).slice(1)}`,
            price: 45 + parseInt(gauge) + piecesCount / 10,
            stock: idx % 7 === 0 ? 3 : idx % 5 === 0 ? 0 : 50 + (idx % 100),
            status: idx % 5 === 0 ? "unavailable" : idx % 7 === 0 ? "low_stock" : "available",
            imageColor: imageColors[idx % imageColors.length],
            specs: {
              gauge,
              length: length === "Short" ? "21mm" : length === "Long" ? "25mm" : "35mm",
              piecesPerPack: piecesCount,
              usage,
              color,
              type: "إبرة تخدير",
            },
            tags: [gauge, length, mfr, usage, color],
          });
          idx++;
        }
      }
    }
  }
  return products;
}

const baseProducts: Omit<Product, "id">[] = [
  {
    name: "Composite Filling A2",
    nameEn: "Composite Filling A2",
    description: "مادة حشو كومبوزيت لون A2 عالية الجودة، مناسبة للحشوات الأمامية والخلفية.",
    categoryId: "filling",
    manufacturer: "3M ESPE",
    sku: "CMP-A2-3M-4G",
    barcode: "6281002003001",
    price: 185,
    stock: 120,
    status: "available",
    imageColor: "#3B82F6",
    specs: { shade: "A2", volume: "4g", type: "كومبوزيت" },
    tags: ["A2", "كومبوزيت", "حشو"],
  },
  {
    name: "Composite Filling A3",
    nameEn: "Composite Filling A3",
    description: "مادة حشو كومبوزيت لون A3، لون طبيعي متوسط.",
    categoryId: "filling",
    manufacturer: "Kerr",
    sku: "CMP-A3-KR-4G",
    barcode: "6281002003002",
    price: 175,
    stock: 85,
    status: "available",
    imageColor: "#2563EB",
    specs: { shade: "A3", volume: "4g", type: "كومبوزيت" },
    tags: ["A3", "كومبوزيت"],
  },
  {
    name: "Bonding Agent Universal",
    nameEn: "Bonding Agent Universal",
    description: "مادة لاصقة عالمية للحشوات التجميلية، التصاق قوي وسريع.",
    categoryId: "filling",
    manufacturer: "Ivoclar Vivadent",
    sku: "BND-UNI-IV-5ML",
    barcode: "6281002003003",
    price: 320,
    stock: 45,
    status: "available",
    imageColor: "#06B6D4",
    specs: { volume: "5ml", type: "Bonding" },
    tags: ["لاصق", "Bonding"],
  },
  {
    name: "Dental Gloves Nitrile Medium",
    nameEn: "Dental Gloves Nitrile M",
    description: "قفازات نيتريل خالية من البودرة، مقاس متوسط، 100 قطعة.",
    categoryId: "gloves",
    manufacturer: "Ansell",
    sku: "GLV-NIT-M-100",
    barcode: "6281002003004",
    price: 65,
    stock: 500,
    status: "available",
    imageColor: "#14B8A6",
    specs: { size: "Medium", material: "Nitrile", piecesPerPack: 100 },
    tags: ["نيتريل", "قفازات"],
  },
  {
    name: "Dental Gloves Nitrile Large",
    nameEn: "Dental Gloves Nitrile L",
    description: "قفازات نيتريل مقاس كبير، مقاومة للثقب.",
    categoryId: "gloves",
    manufacturer: "Medicom",
    sku: "GLV-NIT-L-100",
    barcode: "6281002003005",
    price: 68,
    stock: 350,
    status: "available",
    imageColor: "#10B981",
    specs: { size: "Large", material: "Nitrile", piecesPerPack: 100 },
    tags: ["نيتريل", "كبير"],
  },
  {
    name: "Surgical Mask Type IIR",
    nameEn: "Surgical Mask Type IIR",
    description: "كمامات جراحية Type IIR، 50 قطعة، حماية عالية.",
    categoryId: "consumables",
    manufacturer: "Medicom",
    sku: "MSK-IIR-50",
    barcode: "6281002003006",
    price: 35,
    stock: 800,
    status: "available",
    imageColor: "#0EA5E9",
    specs: { type: "IIR", piecesPerPack: 50 },
    tags: ["كمامات", "جراحية"],
  },
  {
    name: "Disinfectant Spray 1L",
    nameEn: "Disinfectant Spray 1L",
    description: "بخاخ معقم للأسطح والأدوات، 1 لتر، فعال ضد البكتيريا والفيروسات.",
    categoryId: "sterilization",
    manufacturer: "Septodont",
    sku: "DSC-SPR-1L",
    barcode: "6281002003007",
    price: 95,
    stock: 200,
    status: "available",
    imageColor: "#0891B2",
    specs: { volume: "1L", type: "بخاخ" },
    tags: ["معقم", "بخاخ"],
  },
  {
    name: "Endo File K-File #25",
    nameEn: "Endo File K-File #25",
    description: "ملفات قناة جذر K-File مقاس 25، تعبئة 6 قطع.",
    categoryId: "clinic-tools",
    manufacturer: "Dentsply Sirona",
    sku: "END-KF-25-6",
    barcode: "6281002003008",
    price: 145,
    stock: 60,
    status: "available",
    imageColor: "#6366F1",
    specs: { size: "#25", type: "K-File", piecesPerPack: 6 },
    tags: ["Endo", "ملفات"],
  },
  {
    name: "X-Ray Sensor Cover Size 2",
    nameEn: "X-Ray Sensor Cover Size 2",
    description: "أغطية حساسات أشعة مقاس 2، 500 قطعة، معقمة.",
    categoryId: "xray",
    manufacturer: "Hu-Friedy",
    sku: "XRY-COV-S2-500",
    barcode: "6281002003009",
    price: 120,
    stock: 150,
    status: "available",
    imageColor: "#8B5CF6",
    specs: { size: "Size 2", piecesPerPack: 500 },
    tags: ["أشعة", "أغطية"],
  },
  {
    name: "Dental Handpiece High Speed",
    nameEn: "Dental Handpiece High Speed",
    description: "هاند بيس عالي السرعة، توصيلة قياسية، ضمان سنة.",
    categoryId: "dental-devices",
    manufacturer: "NSK",
    sku: "HP-HS-NSK-01",
    barcode: "6281002003010",
    price: 2850,
    stock: 12,
    status: "available",
    imageColor: "#0D9488",
    specs: { type: "High Speed", material: "ستانلس ستيل" },
    tags: ["هاند بيس", "جهاز"],
  },
  {
    name: "Whitening Gel 16%",
    nameEn: "Whitening Gel 16%",
    description: "جل تبييض أسنان 16%، 4 سرنجات مع أطباق.",
    categoryId: "whitening",
    manufacturer: "Ultradent",
    sku: "WHT-GL-16-4",
    barcode: "6281002003011",
    price: 450,
    stock: 30,
    status: "available",
    imageColor: "#F59E0B",
    specs: { volume: "16%", type: "جل تبييض" },
    tags: ["تبييض", "جل"],
  },
  {
    name: "Surgical Forceps #150",
    nameEn: "Surgical Forceps #150",
    description: "ملقط جراحة فم وأسنان رقم 150، ستانلس ستيل.",
    categoryId: "surgery",
    manufacturer: "Hu-Friedy",
    sku: "SRG-FRC-150",
    barcode: "6281002003012",
    price: 280,
    stock: 25,
    status: "available",
    imageColor: "#EF4444",
    specs: { type: "ملقط", size: "#150" },
    tags: ["جراحة", "ملقط"],
  },
  {
    name: "Dental Mirror #5",
    nameEn: "Dental Mirror #5",
    description: "مرآة فحص أسنان رقم 5، مقبض مريح.",
    categoryId: "clinic-tools",
    manufacturer: "Hu-Friedy",
    sku: "TLS-MIR-5",
    barcode: "6281002003013",
    price: 45,
    stock: 200,
    status: "available",
    imageColor: "#64748B",
    specs: { size: "#5", type: "مرآة" },
    tags: ["مرآة", "فحص"],
  },
  {
    name: "Autoclave Indicator Tape",
    nameEn: "Autoclave Indicator Tape",
    description: "شريط مؤشر تعقيم للأوتوكلاف، 50 متر.",
    categoryId: "sterilization",
    manufacturer: "3M ESPE",
    sku: "STL-TAP-50M",
    barcode: "6281002003014",
    price: 55,
    stock: 8,
    status: "low_stock",
    imageColor: "#14B8A6",
    specs: { length: "50m", type: "شريط مؤشر" },
    tags: ["تعقيم", "أوتوكلاف"],
  },
  {
    name: "Gutta Percha Points #30",
    nameEn: "Gutta Percha Points #30",
    description: "نقاط جوتا بيرشا مقاس 30، 120 نقطة.",
    categoryId: "clinic-tools",
    manufacturer: "Meta Biomed",
    sku: "END-GP-30-120",
    barcode: "6281002003015",
    price: 75,
    stock: 90,
    status: "available",
    imageColor: "#F97316",
    specs: { size: "#30", piecesPerPack: 120 },
    tags: ["Endo", "جوتا"],
  },
];

export const products: Product[] = [
  ...needleProducts(),
  ...baseProducts.map((p, i) => ({
    ...p,
    id: `prod-${i + 1}`,
  })),
];

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "د. أحمد العتيبي",
    type: "doctor",
    phone: "0501234567",
    city: "الرياض",
    address: "حي العليا، شارع التحلية",
    orderCount: 47,
    lastOrderDate: "2026-06-28T14:30:00",
    email: "ahmed@clinic.sa",
  },
  {
    id: "cust-2",
    name: "عيادة الابتسامة الذهبية",
    type: "clinic",
    phone: "0559876543",
    city: "جدة",
    address: "حي الروضة، طريق الملك",
    orderCount: 128,
    lastOrderDate: "2026-06-29T09:15:00",
    email: "info@goldensmile.sa",
  },
  {
    id: "cust-3",
    name: "مركز الرعاية السنية",
    type: "center",
    phone: "0543216789",
    city: "الدمام",
    address: "حي الفيصلية، شارع الأمير محمد",
    orderCount: 89,
    lastOrderDate: "2026-06-27T16:45:00",
    email: "contact@dentalcare.sa",
  },
  {
    id: "cust-4",
    name: "مستشفى النور التخصصي",
    type: "hospital",
    phone: "0112345678",
    city: "الرياض",
    address: "حي الملز، شارع الستين",
    orderCount: 256,
    lastOrderDate: "2026-06-29T11:00:00",
    email: "procurement@alnoor.sa",
  },
  {
    id: "cust-5",
    name: "د. سارة القحطاني",
    type: "doctor",
    phone: "0567891234",
    city: "مكة",
    address: "حي العزيزية",
    orderCount: 34,
    lastOrderDate: "2026-06-25T10:20:00",
    email: "sara.dental@gmail.com",
  },
  {
    id: "cust-6",
    name: "عيادة دنتال بلس",
    type: "clinic",
    phone: "0534567890",
    city: "الخبر",
    address: "حي الراكة",
    orderCount: 67,
    lastOrderDate: "2026-06-28T08:30:00",
    email: "orders@dentalplus.sa",
  },
];

export const deliveryAgents: DeliveryAgent[] = [
  {
    id: "agent-1",
    name: "محمد الشهري",
    phone: "0501112233",
    city: "الرياض",
    status: "busy",
    activeOrders: 2,
  },
  {
    id: "agent-2",
    name: "خالد الدوسري",
    phone: "0554445566",
    city: "جدة",
    status: "available",
    activeOrders: 0,
  },
  {
    id: "agent-3",
    name: "فهد العنزي",
    phone: "0547778899",
    city: "الدمام",
    status: "busy",
    activeOrders: 1,
  },
  {
    id: "agent-4",
    name: "عبدالله الحربي",
    phone: "0563334455",
    city: "الرياض",
    status: "available",
    activeOrders: 0,
  },
];

export const orders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "SK-482917",
    customerId: "cust-2",
    customerName: "عيادة الابتسامة الذهبية",
    customerType: "clinic",
    city: "جدة",
    phone: "0559876543",
    address: "حي الروضة، طريق الملك",
    items: [
      { productId: "needle-1", productName: "إبرة أسنان Septodont Gauge 27 طويلة", quantity: 5, price: 72, sku: "NDL-27-L-SEP-20" },
      { productId: "prod-1", productName: "Composite Filling A2", quantity: 3, price: 185, sku: "CMP-A2-3M-4G" },
    ],
    total: 915,
    status: "out_for_delivery",
    createdAt: "2026-06-29T08:30:00",
    deliveryAgentId: "agent-2",
    deliveryAgentName: "خالد الدوسري",
    estimatedDelivery: "2026-06-29T12:30:00",
    deliveryMethod: "express",
  },
  {
    id: "ord-2",
    orderNumber: "SK-391204",
    customerId: "cust-1",
    customerName: "د. أحمد العتيبي",
    customerType: "doctor",
    city: "الرياض",
    phone: "0501234567",
    address: "حي العليا، شارع التحلية",
    items: [
      { productId: "prod-4", productName: "Dental Gloves Nitrile Medium", quantity: 10, price: 65, sku: "GLV-NIT-M-100" },
    ],
    total: 650,
    status: "preparing",
    createdAt: "2026-06-29T10:15:00",
    deliveryMethod: "standard",
  },
  {
    id: "ord-3",
    orderNumber: "SK-567823",
    customerId: "cust-4",
    customerName: "مستشفى النور التخصصي",
    customerType: "hospital",
    city: "الرياض",
    phone: "0112345678",
    address: "حي الملز، شارع الستين",
    items: [
      { productId: "prod-10", productName: "Dental Handpiece High Speed", quantity: 2, price: 2850, sku: "HP-HS-NSK-01" },
      { productId: "prod-7", productName: "Disinfectant Spray 1L", quantity: 20, price: 95, sku: "DSC-SPR-1L" },
    ],
    total: 7600,
    status: "new",
    createdAt: "2026-06-29T11:00:00",
    deliveryMethod: "standard",
  },
  {
    id: "ord-4",
    orderNumber: "SK-234891",
    customerId: "cust-3",
    customerName: "مركز الرعاية السنية",
    customerType: "center",
    city: "الدمام",
    phone: "0543216789",
    address: "حي الفيصلية",
    items: [
      { productId: "needle-5", productName: "إبرة أسنان Gauge 30 قصيرة", quantity: 8, price: 78, sku: "NDL-30-S-DEN-50" },
    ],
    total: 624,
    status: "delivered",
    createdAt: "2026-06-28T14:00:00",
    deliveryAgentId: "agent-3",
    deliveryAgentName: "فهد العنزي",
    deliveryMethod: "standard",
  },
  {
    id: "ord-5",
    orderNumber: "SK-891234",
    customerId: "cust-6",
    customerName: "عيادة دنتال بلس",
    customerType: "clinic",
    city: "الخبر",
    phone: "0534567890",
    address: "حي الراكة",
    items: [
      { productId: "prod-11", productName: "Whitening Gel 16%", quantity: 2, price: 450, sku: "WHT-GL-16-4" },
      { productId: "prod-3", productName: "Bonding Agent Universal", quantity: 1, price: 320, sku: "BND-UNI-IV-5ML" },
    ],
    total: 1220,
    status: "delivered",
    createdAt: "2026-06-27T09:30:00",
    deliveryAgentId: "agent-3",
    deliveryAgentName: "فهد العنزي",
    deliveryMethod: "express",
  },
];

export const clinicAddresses: ClinicAddress[] = [
  {
    id: "addr-1",
    label: "العيادة الرئيسية",
    address: "حي العليا، شارع التحلية، مبنى 45",
    city: "الرياض",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "فرع الشمال",
    address: "حي النرجس، طريق أنس بن مالك",
    city: "الرياض",
    isDefault: false,
  },
];

export const dashboardStats = {
  totalProducts: products.length,
  todayOrders: 12,
  deliveringOrders: orders.filter((o) => o.status === "out_for_delivery").length,
  totalSales: 284750,
  salesGrowth: 12.5,
};

export const salesChartData = [
  { month: "يناير", sales: 185000 },
  { month: "فبراير", sales: 198000 },
  { month: "مارس", sales: 215000 },
  { month: "أبريل", sales: 232000 },
  { month: "مايو", sales: 248000 },
  { month: "يونيو", sales: 284750 },
];

export const orderStatusChartData = [
  { status: "جديد", count: 8, color: "#3B82F6" },
  { status: "جاري التجهيز", count: 15, color: "#F59E0B" },
  { status: "خرج للتوصيل", count: 6, color: "#8B5CF6" },
  { status: "تم التسليم", count: 142, color: "#10B981" },
  { status: "ملغي", count: 3, color: "#EF4444" },
];

export const topProducts = [
  { name: "Dental Gloves Nitrile Medium", orders: 89, revenue: 5785 },
  { name: "إبرة أسنان Septodont Gauge 27", orders: 76, revenue: 5472 },
  { name: "Composite Filling A2", orders: 64, revenue: 11840 },
  { name: "Disinfectant Spray 1L", orders: 58, revenue: 5510 },
  { name: "Surgical Mask Type IIR", orders: 52, revenue: 1820 },
];

export const salesByCategory = [
  { category: "الإبر", sales: 45200 },
  { category: "مواد الحشو", sales: 38500 },
  { category: "القفازات", sales: 32100 },
  { category: "مواد التعقيم", sales: 28900 },
  { category: "مستهلكات يومية", sales: 25600 },
  { category: "أجهزة الأسنان", sales: 68400 },
];

export const lowStockProducts = products
  .filter((p) => p.status === "low_stock" || p.stock < 15)
  .slice(0, 8);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

export const manufacturersList = [...new Set(products.map((p) => p.manufacturer))].sort();

export const customerTypeLabels: Record<string, string> = {
  doctor: "طبيب",
  clinic: "عيادة",
  center: "مركز",
  hospital: "مستشفى",
};

export const orderStatusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "جاري التجهيز",
  out_for_delivery: "خرج للتوصيل",
  delivered: "تم التسليم",
  cancelled: "ملغي",
};

export const productStatusLabels: Record<string, string> = {
  available: "متوفر",
  unavailable: "غير متوفر",
  low_stock: "مخزون منخفض",
};
