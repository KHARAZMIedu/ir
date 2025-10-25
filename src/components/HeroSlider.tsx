import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  "https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/IMG-20250914-WA0000.webp",
  "https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/IMG-20250914-WA0001.webp",
  "https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/IMG-20250914-WA0002.webp",
  "https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/%D8%B7%D8%B1%D8%AD%20%D8%AA%D8%A7%D8%A8%D8%B3%D8%AA%D8%A7%D9%86%D9%874.webp",
  "https://raw.githubusercontent.com/KHARAZMIedu/.ir/main/%D8%A2%D9%85%D9%88%D8%B2%D8%B4%DA%AF%D8%A7%D9%87%20%D8%AE%D9%88%D8%A7%D8%B1%D8%B2%D9%85%DB%8C(%D9%87%D9%88%D8%B4%20%D9%85%D8%B5%D9%86%D9%88%D8%B9%DB%8C)-4.webp",
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToCourses = () => {
    document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-primary-foreground">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg">
          مجتمع فنی آموزشی خوارزمی
        </h1>
        <p className="text-xl md:text-2xl mb-4 animate-slide-up opacity-90">
          ۱۹ سال تجربه درخشان در زمینه آموزش‌های تخصصی
        </p>
        <p className="text-lg md:text-xl mb-8 animate-slide-up opacity-80">
          با مدیریت مهندس ساجدی
        </p>
        <Button
          size="lg"
          onClick={scrollToCourses}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 py-6 shadow-glow animate-scale-in"
        >
          مشاهده دوره ها
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-accent w-8" : "bg-primary-foreground/50"
            }`}
            aria-label={`اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
