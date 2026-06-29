export function LoadingState({ text = "جاري التحميل..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-10 h-10 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 mt-4">{text}</p>
    </div>
  );
}
