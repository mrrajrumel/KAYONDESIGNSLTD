import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  ClipboardList,
  Map,
  Truck,
  CheckCircle2,
  Users,
  Zap,
  TrendingUp,
  Target,
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

const pillars = [
  {
    icon: CheckCircle2,
    title: 'Experienced.',
    desc: 'Over a decade of navigating complex planning requirements and regulatory frameworks for high-profile developments across London and the UK.',
  },
  {
    icon: Users,
    title: 'Trusted.',
    desc: 'Chosen by leading contractors and consultants for reliable, buildable logistics strategies that deliver results on site.',
  },
  {
    icon: Target,
    title: 'Delivery Focused.',
    desc: 'We plan for execution, not just approval. Real-world solutions that keep your programme on track and your team aligned.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Initial Brief',
    desc: 'We review your project requirements, programme, and planning conditions to understand what is needed.',
  },
  {
    step: '02',
    title: 'Site Assessment',
    desc: 'Our team assesses site constraints, local authority requirements, and access conditions.',
  },
  {
    step: '03',
    title: 'Strategy Development',
    desc: 'We develop a logistics strategy that is both compliant with planning conditions and practical for your team.',
  },
  {
    step: '04',
    title: 'Document Production',
    desc: 'High-quality CLP, swept path, and access plan documents are produced to planning authority standards.',
  },
  {
    step: '05',
    title: 'Review & Submission',
    desc: 'We support you through the review process, responding to any queries from the planning authority.',
  },
  {
    step: '06',
    title: 'Ongoing Support',
    desc: 'Post-approval, we can provide updates and revisions as your project evolves on site.',
  },
];

export default function Planning() {
  const navigate = useNavigate();
  const heroRef = useReveal();
  const pillarsRef = useReveal();
  const processRef = useReveal();
  const bentoRef = useReveal();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Major construction site in London with cranes against blue sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
        </div>

        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-4">
              Planning Focus. Delivery Success.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Strategic logistics planning that supports project success{' '}
              <span className="text-secondary">from the start.</span>
            </h1>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
              Navigating the complexities of urban construction with precision-engineered logistics, compliance expertise, and buildable strategies for developers across the UK.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: ClipboardList, label: 'CLPs' },
                { icon: Truck, label: 'Swept Paths' },
                { icon: Map, label: 'Access Plans' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 w-16">
                  <div className="w-12 h-12 flex items-center justify-center border border-outline-variant text-primary bg-surface/80">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-on-surface-variant">{label}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-xl bg-surface-container-lowest">
        <div
          ref={pillarsRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Our Foundation</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Three core principles that underpin every project we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-md border border-outline-variant hover:border-primary transition-colors group">
                <div className="mb-md text-primary group-hover:scale-110 transition-transform origin-left">
                  <Icon size={40} />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-2">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Layout */}
      <section className="py-xl bg-surface">
        <div
          ref={bentoRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="mb-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Practical Solutions. Real-World Results.</h2>
            <div className="h-1 w-24 bg-secondary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Main feature */}
            <div className="md:col-span-8 relative bg-white border border-outline-variant overflow-hidden h-96">
              <img
                src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Architectural site plan and access strategy document"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10 p-lg h-full flex flex-col justify-end bg-gradient-to-t from-white via-white/80 to-transparent">
                <h4 className="text-2xl font-semibold text-primary mb-2">Access Plans &amp; Tender Support</h4>
                <p className="text-on-surface-variant max-w-md mb-4">
                  Comprehensive visual documentation that demonstrates logistical viability to stakeholders and planning authorities.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Reduce Risk', 'Improve Approvals', 'Save Time', 'Protect Programme'].map((item) => (
                    <div key={item} className="flex items-center gap-1 text-xs font-semibold text-primary">
                      <CheckCircle2 size={14} className="text-secondary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side cards */}
            <div className="md:col-span-4 bg-primary text-on-primary p-lg flex flex-col justify-between">
              <div>
                <Users size={40} className="mb-4" />
                <h4 className="text-2xl font-semibold mb-2">Collaborative</h4>
                <p className="text-on-primary/80 leading-relaxed">
                  We work as an extension of your project team, ensuring our plans align with your operational reality.
                </p>
              </div>
              <div className="pt-4 border-t border-on-primary/20">
                <span className="text-xs font-semibold uppercase tracking-widest">Stakeholder Engagement</span>
              </div>
            </div>

            <div className="md:col-span-4 bg-secondary-container text-on-secondary-container p-lg flex flex-col justify-between">
              <div>
                <Zap size={40} className="mb-4" />
                <h4 className="text-2xl font-semibold mb-2">Responsive</h4>
                <p className="opacity-80 leading-relaxed">
                  Agile turnarounds on technical documents to meet tight tender and planning submission windows.
                </p>
              </div>
              <div className="pt-4 border-t border-on-secondary-container/20">
                <span className="text-xs font-semibold uppercase tracking-widest">Rapid Response Unit</span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white border border-outline-variant p-lg">
              <TrendingUp size={40} className="text-secondary mb-4" />
              <h4 className="text-2xl font-semibold text-primary mb-2">Commercially Aware</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Plans that balance compliance with cost-effective operational strategies.
              </p>
            </div>

            <div className="md:col-span-4 relative bg-surface-container-high border border-outline-variant flex items-center justify-center p-lg overflow-hidden">
              <div className="text-center">
                <MapPin size={48} className="text-primary mx-auto mb-2" />
                <h4 className="text-2xl font-semibold text-primary">London &amp; UK Wide</h4>
                <p className="text-on-surface-variant text-xs mt-1 font-semibold">
                  Active projects from the City to regional hubs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-xl bg-surface-container-low">
        <div
          ref={processRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="text-center mb-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">How We Work</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              A clear, structured process that takes your project from initial brief to planning submission and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {processSteps.map(({ step, title, desc }) => (
              <div key={step} className="bg-surface border border-outline-variant p-md relative overflow-hidden group hover:border-primary transition-colors">
                <span className="absolute top-4 right-4 text-5xl font-bold text-outline-variant/20 group-hover:text-primary/10 transition-colors">
                  {step}
                </span>
                <h4 className="font-semibold text-primary mb-2 text-lg">{title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid3" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3)" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-4">
            Ready to secure your project's logistical success?
          </h2>
          <p className="text-on-primary-container mb-lg text-lg">
            Contact our planning consultancy team today for an initial consultation on your development's logistics requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-md">
            <button
              onClick={() => navigate('/contact')}
              className="bg-secondary text-on-secondary px-lg py-3 font-bold hover:opacity-90 transition-opacity"
            >
              Request Planning Review
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
