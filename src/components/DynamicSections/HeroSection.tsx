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
            className="w-full h-full object-cover opacity-20 transition-transform duration-1000 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="space-y-8">
          {data?.subtitle && (
            <div className="inline-flex items-center px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-bold tracking-widest uppercase">
              {data.subtitle}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tight" dangerouslySetInnerHTML={{ __html: data?.title || 'Default Title' }}>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed font-medium">
            {data?.description || 'Default description'}
          </p>
          
          {data?.bullets && (
            <div className="flex flex-wrap gap-6 pt-4">
              {data.bullets.map((word: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 border-l-4 border-secondary pl-4">
                  <span className="font-bold text-primary text-xl tracking-tight">{word}</span>
                </div>
              ))}
            </div>
          )}

          {data?.buttonUrl && data?.buttonText && (
            <div className="pt-8">
              <Link to={data.buttonUrl} className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-4 rounded-lg font-bold tracking-wide hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
                {data.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          )}
        </div>

        <div className="hidden md:block relative pl-10">
          {data?.sideImage && (
            <div className="aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden relative shadow-2xl">
              <img
                src={data.sideImage}
                alt="Construction Planning"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 border-[6px] border-surface/40 rounded-tl-[100px] rounded-br-[100px]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
