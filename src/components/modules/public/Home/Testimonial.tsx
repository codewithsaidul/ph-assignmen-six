import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "../SectionHeading";
import { testimonials } from "@/constants";
import { Star, User } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Our Users Say"
          desc="Real feedback from riders and drivers who trust Rydex for their transportation needs."
        />

        {/* why choose container */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="shadow-card duration-500 hover:scale-105 hover:shadow-lg transition-all group hover:duration-500"
            >
              <CardContent className="text-center">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-primary fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center gap-3 justify-center">
                    <div className="w-10 h-10 flex items-center justify-center gradient-primary rounded-full">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
