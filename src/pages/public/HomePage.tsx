import Hero from "@/components/modals/public/Home/Hero";
import HowItWorks from "@/components/modals/public/Home/HowItWorks";
import Testimonial from "@/components/modals/public/Home/Testimonial";
import WhyChoose from "@/components/modals/public/Home/WhyChoose";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <Testimonial />
    </div>
  );
}
