import { useEffect, useRef, useState } from 'react';
import {
  ClipboardList,
  Truck,
  Map,
  TrafficCone,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Users,
  Zap,
  Target,
  TrendingUp,
} from 'lucide-react';
import WorkShowcaseSection from '../components/WorkShowcaseSection';
import SEO from '../components/SEO';
import api from '../services/api';
import { Link } from 'react-router-dom';

const icons: { [key: string]: React.ElementType } = {
  ClipboardList,
  Truck,
  Map,
  TrafficCone,
  Handshake,
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Users,
};

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

export default function Home() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/homepage')
      .then(res => setPageData(res.data.data))
      .catch(err => console.error("Failed to fetch homepage data:", err))
      .finally(() => setLoading(false));
  }, []);

  const getSection = (type: string) => {
    return pageData?.sections.find((s: any) => s.type === type);
  }

  const heroRef = useReveal();
  const servicesRef = useReveal();
  const valuesRef = useReveal();
  const ctaRef = useReveal();

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <main className="pt-20">
      <SEO title="Construction Logistics & Planning" description="Strategic logistics planning that supports project success from the start. We bridge the gap between architectural vision and buildable reality." />
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="London construction site with cranes and city skyline"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
        </div>

        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase">
              Est. London &nbsp;&middot;&nbsp; Supporting Developers &amp; Contractors
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight">
              Planning Focus.<br />Delivery Success.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Strategic logistics planning that supports project success from the start. We bridge the gap between architectural vision and buildable reality.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              {['Buildable.', 'Compliant.', 'Efficient.'].map((word) => (
                <div key={word} className="flex items-center gap-2 border-l-4 border-primary pl-3">
                  <span className="font-bold text-primary text-lg">{word}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="border border-outline-variant overflow-hidden aspect-square relative group">
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Construction professional reviewing blueprints on site"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-0 right-0 bg-primary text-on-primary p-4">
                <p className="text-xs font-semibold leading-tight uppercase tracking-wider">
                  London Based<br />Consultancy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service icons row */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/5 border-t border-outline-variant/30 py-4 hidden md:block">
          <div className="max-w-7xl mx-auto px-margin-desktop flex justify-center gap-12">
            {[
              { icon: ClipboardList, label: 'CLPs' },
              { icon: Truck, label: 'Swept Paths' },
              { icon: Map, label: 'Access Plans' },
              { icon: TrafficCone, label: 'Traffic Management' },
              { icon: Handshake, label: 'Tender Support' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-on-surface-variant">
                <Icon size={20} className="text-primary" />
                <span className="text-xs font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Work Showcase Section */}
      <WorkShowcaseSection />

      {/* Services Overview */}
      <section ref={servicesRef} className="py-24 bg-white opacity-0 translate-y-6 transition-all duration-700">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-lg items-center">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Logistics Planning Services</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              From feasibility and planning to traffic management and tender support, our services cover every stage of your construction project.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {(getSection('services_list')?.content.items || []).map((service: any, index: number) => {
              const Icon = icons[service.icon];
              return (
                <div key={index} className={`p-6 rounded-xl transition-all ${index === 0 ? 'bg-surface-container-high' : 'hover:bg-surface-container-high'}`}>
                  {Icon && <Icon className="w-8 h-8 text-primary mb-4" />}
                  <h3 className="text-lg font-bold text-on-surface mb-2">{service.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-surface opacity-0 translate-y-6 transition-all duration-700">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">We Turn Logistics into an Asset</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Our approach protects your programme, adds commercial value, and streamlines approvals by delivering clear, compliant, and buildable logistics strategies.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(getSection('values_list')?.content.items || []).map((value: any, index: number) => {
              const Icon = icons[value.icon];
              return (
                <div key={index}>
                  <div className="w-16 h-16 bg-surface-container-high text-primary rounded-xl flex items-center justify-center mx-auto border border-outline-variant">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mt-6 mb-2">{value.title}</h3>
                  <p className="text-on-surface-variant">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 bg-primary/5 opacity-0 translate-y-6 transition-all duration-700">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Ready to start your project?</h2>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Let's discuss how our expert logistics planning can ensure your next construction project runs smoothly and efficiently.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-primary text-on-primary px-10 py-4 text-sm font-black tracking-[0.15em] uppercase hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Get a Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Qualities */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {(getSection('qualities_list')?.content.items || []).map((quality: any, index: number) => {
            const Icon = icons[quality.icon];
            return(
              <div key={index} className="flex gap-6">
                <div className="text-primary">
                  {Icon && <Icon size={28} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{quality.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{quality.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  );
}
