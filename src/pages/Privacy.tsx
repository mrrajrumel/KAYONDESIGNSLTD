import { useEffect, useRef } from 'react';

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

const sections = [
  {
    title: 'What Information We Collect',
    content: `We collect information to provide you with the best service possible. Here's what we gather:

• Contact details: name, email, phone, and company information
• Project information: details about your construction project
• Communication records: messages and enquiries you send us
• Website usage: how you interact with our site (through standard analytics)

We only collect information you voluntarily provide or that helps us improve our service to you.`,
  },
  {
    title: 'How We Use Your Information',
    content: `Your information helps us do what we do best:

• Respond to your enquiries and provide consultancy services
• Send you relevant project updates and logistics information
• Improve our website and services
• Comply with legal obligations
• Protect against fraud and misuse

We never sell your information to third parties. Period.`,
  },
  {
    title: 'Data Protection & Security',
    content: `We take data security seriously:

• Your data is encrypted in transit and at rest
• We use industry-standard security measures
• Only authorized team members can access your information
• We comply with GDPR and UK data protection laws
• You can request to see, update, or delete your data at any time

If you have any concerns about your data, contact us immediately.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to:

• Access your personal data
• Correct inaccurate information
• Request deletion (the "right to be forgotten")
• Opt out of marketing communications
• Port your data to another service
• Lodge a complaint with the ICO (Information Commissioner's Office)

Simply email us to exercise any of these rights. We'll respond within 30 days.`,
  },
  {
    title: 'Cookies & Tracking',
    content: `Our website uses minimal cookies:

• Essential cookies keep the site working properly
• Analytics cookies help us understand visitor behaviour (anonymously)
• No advertising or tracking cookies
• You can disable cookies in your browser settings

We respect your privacy. No tracking pixels, no retargeting ads.`,
  },
  {
    title: 'Third-Party Sharing',
    content: `We only share your data when necessary:

• Service providers (email, hosting) under strict confidentiality agreements
• Legal authorities if required by law
• Never with marketing agencies or data brokers
• Your project details remain confidential between us and you

If we need to share data for a specific project need, we'll ask permission first.`,
  },
  {
    title: 'Contact & Questions',
    content: `Questions about your data? We're here to help:

Email: privacy@kayondesigns.co.uk
Phone: Contact us through our main site
Address: London, United Kingdom

We'll respond within 5 business days. If you're not satisfied with our response, you can contact the ICO.`,
  },
];

export default function Privacy() {
  const heroRef = useReveal();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-primary py-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pgrid)" />
          </svg>
        </div>
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-on-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-on-primary-container max-w-2xl mx-auto text-lg">
            We believe privacy is a fundamental right. Here's how we protect yours.
          </p>
          <p className="text-on-primary/70 mt-4 text-sm">
            Last updated: May 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-xl bg-surface">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-xl p-md bg-surface-container-low border border-secondary/30 rounded">
            <p className="text-on-surface-variant text-sm leading-relaxed">
              <strong>In Plain English:</strong> We collect only the information you give us or what helps us serve you better. We never sell your data. We use industry-standard security. You have complete control over your information at all times. If you want to know exactly what we hold about you, just ask — we'll tell you within 30 days.
            </p>
          </div>

          <div className="space-y-xl">
            {sections.map((section, idx) => (
              <div key={idx} className="border-l-4 border-secondary pl-md opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${idx * 100}ms` }}>
                <h2 className="text-2xl font-bold text-primary mb-3">{section.title}</h2>
                <p className="text-on-surface-variant whitespace-pre-line leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-xl pt-lg border-t border-outline-variant">
            <h3 className="text-xl font-bold text-primary mb-3">Need Help?</h3>
            <p className="text-on-surface-variant mb-4">
              This policy might seem long, but we've tried to write it in plain English. If anything is still unclear, email us. We'll explain it in simpler terms.
            </p>
            <a
              href="mailto:privacy@kayondesigns.co.uk"
              className="inline-block bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Us About Privacy
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
