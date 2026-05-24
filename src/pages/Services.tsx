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
    title: 'Construction Logistics Plans (CLPs)',
    shortTitle: 'CLPs',
    desc: 'Detailed Construction Logistics Plans tailored for planning approval and operational success. Our CLPs are structured to meet borough-specific requirements while remaining practical and buildable.',
    features: ['Borough Compliance', 'Route Analysis', 'Delivery Scheduling', 'Waste Management Planning'],
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Truck,
    title: 'Swept Path Analysis',
    shortTitle: 'Swept Paths',
    desc: 'Advanced vehicle tracking simulations to prove site accessibility for all vehicle types. We use industry-standard AutoTURN software to verify that your access arrangements are feasible.',
    features: ['AutoTURN Analysis', 'Multi-Vehicle Support', 'Site Constraint Mapping', 'Clearance Certification'],
    image: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Map,
    title: 'Access Plans',
    shortTitle: 'Access Plans',
    desc: 'Strategic planning of site entrance and egress points for optimal traffic flow and pedestrian safety. We design access arrangements that satisfy planning authorities and work in practice.',
    features: ['Pedestrian Safety', 'Hoarding Layouts', 'Gate Positions', 'Emergency Access Routes'],
    image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: TrafficCone,
    title: 'Traffic Management',
    shortTitle: 'Traffic Management',
    desc: 'Mitigation strategies for road works, site deliveries, and community impact. We develop traffic management plans that keep your project moving while minimising disruption.',
    features: ['Licencing Support', 'Peak Flow Mitigation', 'TRO Applications', 'Signage Schemes'],
    image: 'https://images.pexels.com/photos/1231365/pexels-photo-1231365.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Handshake,
    title: 'Tender Support',
    shortTitle: 'Tender Support',
    desc: 'Professional logistics visualisation and strategic planning documentation that gives your bids the winning edge. We create clear, compelling logistics narratives for tender submissions.',
    features: ['Bid Documentation', 'Logistics Narratives', 'Visual Planning', 'Programme Support'],
    image: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const qualities = [
  { icon: Users, title: 'Collaborative', desc: 'We integrate with your project team to ensure our logistics align with your operational goals from day one.' },
  { icon: Zap, title: 'Responsive', desc: 'Agile turnarounds on technical documents to meet tight tender and planning submission deadlines.' },
  { icon: TrendingUp, title: 'Commercially Aware', desc: 'Plans that balance regulatory compliance with cost-effective, practical operational strategies.' },
  { icon: Target, title: 'Delivery Driven', desc: 'We plan for execution, not just approval. Every document is built around real-world site conditions.' },
];

export default function Services() {
  const navigate = useNavigate();
  const heroRef = useReveal();
  const servicesRef = useReveal();
  const qualitiesRef = useReveal();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-surface overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#707971" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl relative z-10 grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-4">
              Construction Logistics &amp; Planning
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              PRACTICAL SOLUTIONS.<br />REAL-WORLD RESULTS.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
              Buildable logistics strategies that keep projects moving. We specialise in navigating the complexities of London's urban development landscape with precision and authority.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: CheckCircle2, text: 'Reduce Risk' },
                { icon: TrendingUp, text: 'Improve Approvals' },
                { icon: Zap, text: 'Save Time' },
                { icon: Target, text: 'Protect Programme' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={18} className="text-secondary fill-secondary flex-shrink-0" />
                  <span className="font-medium text-on-surface">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-80 md:h-[500px] border border-outline-variant overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Logistics truck on a London construction site"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-xl bg-surface-container-lowest">
        <div
          ref={servicesRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-xl max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Our Core Services</h2>
            <p className="text-on-surface-variant">
              From initial planning to on-site execution, our consultancy services are designed to meet the rigorous demands of modern construction.
            </p>
          </div>

          <div className="space-y-gutter">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={service.title}
                  className="grid md:grid-cols-2 border border-outline-variant overflow-hidden hover:border-primary transition-colors group"
                >
                  <div className={`relative h-56 md:h-auto ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <img
                      src={service.image}
                      alt={service.shortTitle}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                  <div className={`p-md flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-2xl font-semibold text-primary mb-3">{service.title}</h3>
                    <p className="text-on-surface-variant mb-4 leading-relaxed">{service.desc}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-1 text-sm text-on-surface">
                          <CheckCircle2 size={13} className="text-secondary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Qualities */}
      <section className="py-xl bg-surface">
        <div
          ref={qualitiesRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="flex flex-col lg:flex-row gap-lg items-center">
            <div className="w-full lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-4">
                Planning Focus. Delivery Success.
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Experienced. Trusted.<br />Delivery Focused.
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed text-lg">
                We support developers, contractors, and consultants across London and the UK. Our collaborative approach ensures that logistics are not an afterthought, but a core component of your project's DNA.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
              >
                Book a Consultation <ArrowRight size={16} />
              </button>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-gutter">
              {qualities.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-md bg-surface-container-low border border-outline-variant hover:border-primary transition-colors">
                  <Icon size={24} className="text-primary mb-3" />
                  <h4 className="font-semibold text-primary mb-1">{title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-4">
            Ready to optimise your logistics?
          </h2>
          <p className="text-on-primary-container max-w-2xl mx-auto mb-lg text-lg">
            Contact our specialist consultancy team today for a comprehensive review of your project's logistics and planning requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-md">
            <button
              onClick={() => navigate('/contact')}
              className="bg-secondary text-on-secondary px-lg py-3 font-bold hover:opacity-90 transition-opacity"
            >
              Book a Consultation
            </button>
            <button
              onClick={() => navigate('/planning')}
              className="border border-on-primary text-on-primary px-lg py-3 font-bold hover:bg-on-primary/10 transition-colors"
            >
              Learn About Planning
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
