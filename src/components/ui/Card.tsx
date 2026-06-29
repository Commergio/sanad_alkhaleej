import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-slate-100 shadow-sm",
        hover && "hover:shadow-md hover:border-sky-100 transition-all duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
