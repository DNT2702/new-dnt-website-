import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      data-cursor-hover
      className="glass group w-[22rem] shrink-0 rounded-3xl p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:[transform:perspective(800px)_rotateX(2deg)_rotateY(-2deg)]"
    >
      <div className="flex gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-foreground/90">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan text-sm font-semibold text-void">
          {testimonial.initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-xs text-muted">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
