import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-6');
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function HeroSection({ data }: { data: any }) {
  const ref = useReveal();

  return (
    <section className="relative min-h-[88vh] flex items-center bg-surface-container-lowest overflow-hidden">
      <div className="absolute inset-0 z-0">
        {data?.backgroundImage && (
          <img
            src={data.backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-15"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-700"
      >
        <div className="space-y-6">
          {data?.subtitle && (
            <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase">
              {data.subtitle}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: data?.title || 'Default Title' }}>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            {data?.description || 'Default description'}
          </p>
          
          {data?.bullets && (
            <div className="flex flex-wrap gap-6 pt-2">
              {data.bullets.map((word: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 border-l-4 border-primary pl-3">
                  <span className="font-bold text-primary text-lg">{word}</span>
                </div>
              ))}
            </div>
          )}

          {data?.buttonUrl && data?.buttonText && (
            <div className="pt-6">
              <Link to={data.buttonUrl} className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded font-semibold tracking-wide hover:bg-primary/90 transition-colors">
                {data.buttonText}
              </Link>
            </div>
          )}
        </div>

        <div className="hidden md:block relative">
          {data?.sideImage && (
            <div className="aspect-[4/5] rounded-tl-[80px] rounded-br-[80px] overflow-hidden relative shadow-xl">
              <img
                src={data.sideImage}
                alt="Construction Planning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-primary rounded-tl-[80px] rounded-br-[80px] scale-[0.96] opacity-50" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
