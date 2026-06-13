import { cn } from "@/lib/utils";

export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div
        className="absolute -left-[10%] top-[5%] h-[40rem] w-[40rem] rounded-full opacity-50 blur-[120px] animate-pulse-slow"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.35), transparent 70%)" }}
      />
      <div
        className="absolute right-[-15%] top-[30%] h-[36rem] w-[36rem] rounded-full opacity-40 blur-[120px] animate-pulse-slow"
        style={{ background: "radial-gradient(circle, rgba(76,224,255,0.3), transparent 70%)", animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[25%] h-[30rem] w-[30rem] rounded-full opacity-30 blur-[120px] animate-pulse-slow"
        style={{ background: "radial-gradient(circle, rgba(255,197,107,0.25), transparent 70%)", animationDelay: "3s" }}
      />
    </div>
  );
}
