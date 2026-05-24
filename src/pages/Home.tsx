import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

const services = [
  {
    icon: ClipboardList,
    title: 'CLPs',
    desc: 'Comprehensive Construction Logistics Plans tailored to secure planning approvals and ensure site feasibility for any development.',
    num: '01',
    featured: true,
  },
  {
    icon: Truck,
    title: 'Swept Paths',
    desc: 'Vehicle tracking analysis for precise site access and clearance verification across all vehicle types.',
    num: '02',
  },
  {
    icon: Map,
    title: 'Access Plans',
    desc: 'Strategic entry and exit route design for optimal site efficiency and pedestrian safety.',
    num: '03',
  },
  {
    icon: TrafficCone,
    title: 'Traffic Management',
    desc: 'Advanced planning for urban streetworks and complex logistics coordination in busy city environments.',
    num: '04',
  },
  {
    icon: Handshake,
    title: 'Tender Support',
    desc: 'Professional logistics visualisation and strategic planning that gives your bids the winning edge.',
    num: '05',
    dark: true,
  },
];

const values = [
  { icon: CheckCircle2, title: 'Reduce Risk', desc: 'Identifying bottlenecks before they impact your programme.' },
  { icon: TrendingUp, title: 'Improve Approvals', desc: 'Expert knowledge of local authority requirements.' },
  { icon: Zap, title: 'Save Time', desc: 'Streamlined processes developed through years of experience.' },
  { icon: Target, title: 'Protect Programme', desc: 'Resilient logistics that adapt to site-specific challenges.' },
];

const qualities = [
  { icon: Users, title: 'Collaborative', desc: 'We work as an extension of your project team.' },
  { icon: Zap, title: 'Responsive', desc: 'Agile turnarounds to meet tight submission windows.' },
  { icon: TrendingUp, title: 'Commercially Aware', desc: 'Balancing compliance with cost-effective strategies.' },
  { icon: Target, title: 'Delivery Driven', desc: 'Real-world solutions that keep your programme on track.' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useReveal();
  const servicesRef = useReveal();
  const valuesRef = useReveal();
  const ctaRef = useReveal();

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
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Get a Free Quote <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="border border-primary text-primary px-8 py-3 font-semibold hover:bg-primary/5 transition-colors"
              >
                Our Services
              </button>
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
        <div
          ref={servicesRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="mb-lg border-l-4 border-secondary pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Practical Solutions. Real-World Results.
            </h2>
            <p className="text-on-surface-variant max-w-xl text-base">
              Supporting developers, contractors, and consultants with industry-leading logistics expertise across London and the UK.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {services.map((s) => {
              const Icon = s.icon;
              if (s.featured) {
                return (
                  <div
                    key={s.title}
                    className="md:col-span-2 border border-outline-variant p-md hover:bg-surface-container-low transition-colors group cursor-pointer relative overflow-hidden"
                    onClick={() => navigate('/services')}
                  >
                    <div className="flex justify-between items-start mb-lg">
                      <div className="p-3 bg-primary text-on-primary">
                        <Icon size={24} />
                      </div>
                      <span className="text-7xl font-bold text-outline-variant/20">{s.num}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">{s.title}</h3>
                    <p className="text-on-surface-variant mb-md">{s.desc}</p>
                    <div className="flex items-center text-primary font-bold gap-1 group-hover:gap-2 transition-all">
                      <span>Explore Service</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                );
              }
              if (s.dark) {
                return (
                  <div
                    key={s.title}
                    className="md:col-span-2 border border-primary bg-primary text-on-primary p-md cursor-pointer group"
                    onClick={() => navigate('/contact')}
                  >
                    <div className="flex justify-between items-start mb-lg">
                      <div className="p-3 bg-white text-primary">
                        <Icon size={24} />
                      </div>
                      <span className="text-7xl font-bold text-on-primary/10">{s.num}</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
                    <p className="text-on-primary/80 mb-md">{s.desc}</p>
                    <div className="flex items-center font-bold gap-1">
                      <span>Partner with us</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={s.title}
                  className="border border-outline-variant p-md hover:bg-surface-container-low transition-colors group cursor-pointer"
                  onClick={() => navigate('/services')}
                >
                  <div className="p-3 bg-primary/10 text-primary w-fit mb-lg">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{s.title}</h3>
                  <p className="text-on-surface-variant text-sm">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-xl bg-surface-container-low">
        <div
          ref={valuesRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="order-2 md:order-1 relative overflow-hidden border border-outline-variant">
            <img
              src="https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Organised construction site showing logistics planning in action"
              className="w-full h-auto grayscale opacity-90"
            />
          </div>

          <div className="order-1 md:order-2 space-y-md">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Experienced. Trusted. Delivery Focused.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Supporting developers, contractors and consultants across London and the UK with buildable logistics strategies that keep projects moving.
            </p>
            <div className="grid grid-cols-2 gap-md">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="space-y-1">
                  <div className="flex items-center gap-2 text-secondary">
                    <Icon size={18} className="fill-secondary" />
                    <span className="font-bold text-on-surface">{title}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm pl-6">{desc}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all pt-2"
            >
              Learn more about us <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Qualities */}
      <section className="py-xl bg-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-lg">
            <h2 className="text-3xl font-bold text-primary mb-2">Why Choose Kayon Designs?</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              We bring together technical expertise and practical experience to deliver logistics solutions that actually work on site.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {qualities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-outline-variant p-md text-center hover:border-primary transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mx-auto mb-3 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Icon size={22} />
                </div>
                <h4 className="font-semibold text-primary mb-1">{title}</h4>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div
          ref={ctaRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col md:flex-row justify-between items-center gap-lg opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-2">
              Ready to start your next project?
            </h2>
            <p className="text-on-primary-container max-w-lg">
              Get in touch with our team of consultants for a tailored logistics proposal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-md shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="bg-secondary text-on-secondary px-lg py-3 font-bold hover:opacity-90 transition-opacity"
            >
              Request a Consultation
            </button>
            <button
              onClick={() => navigate('/services')}
              className="border border-on-primary text-on-primary px-lg py-3 font-bold hover:bg-on-primary/10 transition-colors"
            >
              View Our Services
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
