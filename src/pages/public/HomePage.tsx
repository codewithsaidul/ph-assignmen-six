import Hero from "@/components/modals/public/Home/Hero";
import HowItWorks from "@/components/modals/public/Home/HowItWorks";

export default function HomePage () {
  return (
    <div>
       <Hero />

       <div className="container mx-auto px-4 my-20">
        <HowItWorks />
       </div>
   </div>
  );
};
