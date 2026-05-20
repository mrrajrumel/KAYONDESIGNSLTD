import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

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
  'Construction Logistics Plan (CLP)',
  'Swept Path Analysis',
  'Access Plan',
  'Traffic Management Plan',
  'Tender Support',
  'Other / Not Sure',
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const heroRef = useReveal();
  const formRef = useReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-surface-container-lowest border-b border-outline-variant overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#707971" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cgrid)" />
          </svg>
        </div>
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl text-center relative z-10 opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-widest uppercase mb-4">
            London &amp; UK Wide
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
            Let's Talk About<br />Your Project.
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
            Tell us about your development and we'll put together a tailored logistics proposal. No jargon — just a straightforward conversation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-xl bg-surface">
        <div
          ref={formRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-5 gap-lg opacity-0 translate-y-6 transition-all duration-700"
        >
          {/* Info */}
          <div className="md:col-span-2 space-y-md">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">Get in Touch</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Whether you have a specific project in mind or just want to understand how we can help, our team is ready to talk.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Office Location</h4>
                  <p className="text-on-surface-variant text-sm">London, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Email Us</h4>
                  <a href="mailto:info@kayondesigns.co.uk" className="text-primary text-sm hover:underline">
                    info@kayondesigns.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Call Us</h4>
                  <a href="tel:+44" className="text-primary text-sm hover:underline">
                    Available on request
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-outline-variant p-md bg-surface-container-low">
              <h4 className="font-semibold text-primary mb-3">What to expect:</h4>
              <ul className="space-y-2">
                {[
                  'We respond within 1 business day',
                  'Free initial consultation',
                  'Clear, jargon-free advice',
                  'Tailored proposal for your project',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <CheckCircle2 size={14} className="text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-outline-variant overflow-hidden h-48">
              <img
                src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="London construction site aerial view"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-xl border border-outline-variant bg-surface-container-low min-h-[400px]">
                <div className="w-16 h-16 flex items-center justify-center bg-secondary-container text-secondary mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Message Received!</h3>
                <p className="text-on-surface-variant max-w-md">
                  Thank you for getting in touch. A member of our team will review your enquiry and come back to you within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 border border-outline-variant p-md bg-surface-container-lowest">
                <h3 className="text-xl font-bold text-primary mb-2">Send Us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="+44 ..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                    Service Required
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-outline-variant bg-surface px-3 py-2 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project — location, scale, timeline, and what you need help with..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Send Message <Send size={16} />
                </button>

                <p className="text-xs text-on-surface-variant text-center">
                  We respect your privacy. Your details will only be used to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="bg-surface-container-highest border-t border-outline-variant py-lg">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-primary text-lg">Supporting Developers, Contractors &amp; Consultants</h3>
            <p className="text-on-surface-variant text-sm">Across London and the UK</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {['Buildable.', 'Compliant.', 'Efficient.'].map((word) => (
              <div key={word} className="border-l-4 border-primary pl-3">
                <span className="font-bold text-primary">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
