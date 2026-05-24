import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Users,
  Zap,
  Target,
  TrendingUp,
  MapPin,
  ArrowRight,
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

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: 'London', label: 'Primary Base' },
  { value: 'UK Wide', label: 'Project Coverage' },
  { value: '5 Core', label: 'Service Areas' },
];

const values = [
  { icon: CheckCircle2, title: 'Buildable', desc: 'Every plan we produce is designed to work on site, not just on paper. We understand construction realities.' },
  { icon: TrendingUp, title: 'Compliant', desc: 'Deep knowledge of local authority requirements and planning conditions across London boroughs and beyond.' },
  { icon: Zap, title: 'Efficient', desc: 'Streamlined processes and clear communication mean faster turnarounds without compromising quality.' },
  { icon: Users, title: 'Collaborative', desc: 'We treat every client engagement as a partnership, integrating with your team from day one.' },
  { icon: Target, title: 'Delivery Driven', desc: 'We measure success by your project\'s success. On-time, on-budget, and on-programme.' },
  { icon: MapPin, title: 'London Based', desc: 'Headquartered in London with active projects across the city and wider UK regions.' },
];

export default function About() {
  const navigate = useNavigate();
  const heroRef = useReveal();
  const statsRef = useReveal();
  const valuesRef = useReveal();
  const teamRef = useReveal();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="abgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#707971" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#abgrid)" />
          </svg>
        </div>

        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl relative z-10 grid md:grid-cols-2 gap-lg items-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-4">
              About Kayon Designs Ltd
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              We Make<br />Logistics Work.
            </h1>
            <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
              Kayon Designs Ltd is a London-based construction logistics and planning consultancy. We exist to bridge the gap between architectural ambition and buildable reality — helping developers, contractors, and consultants deliver projects that work on site, not just on paper.
            </p>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Our team brings together expertise in construction logistics, transport planning, and urban development to deliver practical, compliant, and efficient solutions for projects of all scales across the UK.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/contact')}
                className="bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Work With Us <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/services')}
                className="border border-primary text-primary px-8 py-3 font-semibold hover:bg-primary/5 transition-colors"
              >
                Our Services
              </button>
            </div>
          </div>

          <div className="relative border border-outline-variant overflow-hidden h-80 md:h-[500px]">
            <img
              src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Professional team reviewing construction logistics plans"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-primary text-on-primary p-3">
              <p className="text-xs font-semibold leading-tight uppercase tracking-wider">
                London Based<br />UK Wide Projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sgrid)" />
          </svg>
        </div>
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter relative z-10 opacity-0 translate-y-6 transition-all duration-700"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-on-primary mb-1">{value}</div>
              <div className="text-on-primary-container text-sm font-semibold uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-xl bg-surface">
        <div
          ref={valuesRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Our Values</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              The principles that guide every project, document, and client relationship we take on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-md border border-outline-variant hover:border-primary transition-colors group">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-primary text-lg mb-2">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-xl bg-surface-container-low">
        <div
          ref={teamRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="grid md:grid-cols-2 gap-lg items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Supporting the Whole Project Team
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed text-lg">
                We work with everyone involved in bringing a construction project to life. Our expertise sits at the intersection of planning, logistics, and construction management.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Developers', desc: 'From pre-planning to practical completion, we help developers navigate logistics requirements at every stage.' },
                  { title: 'Main Contractors', desc: 'Comprehensive CLPs and access strategies that protect your programme and satisfy planning conditions.' },
                  { title: 'Planning Consultants', desc: 'Expert logistics input to strengthen planning applications and respond to pre-commencement conditions.' },
                  { title: 'Architects & Designers', desc: 'Early-stage logistics advice to ensure designs are buildable from a site access and delivery perspective.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-on-surface">{title}: </span>
                      <span className="text-on-surface-variant text-sm">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-outline-variant overflow-hidden h-80 md:h-auto">
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Construction project team meeting on site"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid4" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid4)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-lg relative z-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-2">
              Ready to work together?
            </h2>
            <p className="text-on-primary-container max-w-lg">
              Tell us about your project and we'll put together a tailored logistics proposal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-md shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="bg-secondary text-on-secondary px-lg py-3 font-bold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </button>
            <button
              onClick={() => navigate('/services')}
              className="border border-on-primary text-on-primary px-lg py-3 font-bold hover:bg-on-primary/10 transition-colors"
            >
              Our Services
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
