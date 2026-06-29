import { deliveryAgents } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Phone, MapPin, Package } from "lucide-react";

export default function AdminDriversPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">المندوبين</h1>
        <p className="text-slate-500 mt-1">إدارة مندوبي التوصيل</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveryAgents.map((agent) => (
          <Card key={agent.id} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-teal-100 flex items-center justify-center text-lg font-bold text-sky-600">
                {agent.name.charAt(0)}
              </div>
              <Badge variant={agent.status === "available" ? "success" : "warning"}>
                {agent.status === "available" ? "متاح" : agent.status === "busy" ? "مشغول" : "غير متصل"}
              </Badge>
            </div>
            <h3 className="font-bold text-slate-800">{agent.name}</h3>
            <div className="space-y-2 mt-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span dir="ltr">{agent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                {agent.city}
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                {agent.activeOrders} طلب نشط
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
