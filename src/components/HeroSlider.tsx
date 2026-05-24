import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaAction: () => void;
}

interface HeroSliderProps {
  slides: Slide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoplay(false);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  return (
    <section className="relative min-h-screen md:min-h-[90vh] overflow-hidden bg-surface-container-lowest pt-20">
      <div className="absolute inset-0 top-20">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-6 transition-all duration-1000 transform ${
                      idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {slide.subtitle}
                  </div>

                  {/* Title */}
                  <h1
                    className={`text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight transition-all duration-1000 transform ${
                      idx === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                  >
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    className={`text-lg md:text-xl text-on-surface-variant mb-8 max-w-lg leading-relaxed transition-all duration-1000 delay-200 transform ${
                      idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={slide.ctaAction}
                    className={`bg-primary text-on-primary px-8 py-4 font-bold hover:opacity-90 transition-all transform duration-1000 delay-300 inline-flex items-center gap-2 group ${
                      idx === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {slide.cta}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-3 rounded-full transition-all ${
              idx === current
                ? 'bg-primary w-8'
                : 'bg-white/30 w-3 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Autoplay indicator */}
      {autoplay && (
        <div className="absolute top-8 right-8 z-20 text-on-surface-variant text-xs font-semibold">
          Auto-play
        </div>
      )}
    </section>
  );
}
