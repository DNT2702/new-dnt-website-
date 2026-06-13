export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Whitfield",
    role: "CEO, Lumora Skincare",
    quote: "DNT Web transformed our online store into a true brand experience. Conversions jumped 68% within the first month of launch.",
    initials: "SW",
  },
  {
    name: "Marcus Chen",
    role: "Founder, Northpeak Capital",
    quote: "The dashboard they built is faster and more intuitive than anything our previous vendor delivered in two years.",
    initials: "MC",
  },
  {
    name: "Priya Nair",
    role: "Ops Director, Atlas Logistics",
    quote: "Their automation system saved our team 40 hours every week. It paid for itself within the first quarter.",
    initials: "PN",
  },
  {
    name: "James Okafor",
    role: "Marketing Lead, Verve Fitness",
    quote: "Working with DNT felt like having an in-house product team. Communication was clear and the AI integration just works.",
    initials: "JO",
  },
  {
    name: "Elena Rossi",
    role: "Creative Director, Solace Studio",
    quote: "Easily the most polished website we've ever had. The animations and attention to detail are on another level.",
    initials: "ER",
  },
  {
    name: "David Kim",
    role: "CTO, Brightline Health",
    quote: "Performance-first development is not just a buzzword for this team — our Lighthouse scores went from 54 to 97.",
    initials: "DK",
  },
];
