import CallToAction from "@/components/modules/public/Home/CallToAction";
import Hero from "@/components/modules/public/Home/Hero";
import HowItWorks from "@/components/modules/public/Home/HowItWorks";
import Testimonial from "@/components/modules/public/Home/Testimonial";
import WhyChoose from "@/components/modules/public/Home/WhyChoose";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChoose />
      <Testimonial />
      <CallToAction />
    </div>
  );
}
