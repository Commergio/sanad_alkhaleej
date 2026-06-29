import { cn } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "ابحث عن منتج...",
  className,
  loading,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-12 pl-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 text-slate-800 placeholder:text-slate-400 transition-all"
      />
      {loading && (
        <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500 animate-spin" />
      )}
    </div>
  );
}
