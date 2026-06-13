import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Parallax } from "@/components/Parallax";
import { testimonials } from "@/data/testimonials";

const row1 = testimonials.slice(0, 3);
const row2 = testimonials.slice(3, 6);

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28 sm:py-36">
      <Parallax speed={70} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-[-8%] bottom-0 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(255,197,107,0.3), transparent 70%)" }}
        />
      </Parallax>
      <div className="container-px relative mx-auto">
        <SectionHeader
          eyebrow="Client Results"
          title="Trusted By Modern Businesses"
          description="Don't just take our word for it — here's what our clients have to say about working with DNT Web."
          align="center"
          className="mx-auto"
        />
      </div>

      <div className="mt-16 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {[...row1, ...row2, ...row1, ...row2].map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
        <div className="flex w-max animate-marquee gap-6 [animation-direction:reverse] hover:[animation-play-state:paused]">
          {[...row2, ...row1, ...row2, ...row1].map((t, i) => (
            <TestimonialCard key={`${t.name}-rev-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
