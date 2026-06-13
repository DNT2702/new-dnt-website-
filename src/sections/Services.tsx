import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="container-px mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          title="Full-Stack Digital Solutions"
          description="From first pixel to production deployment — we design, build and scale digital products that move the needle."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
