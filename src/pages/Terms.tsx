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
    title: 'Who We Are',
    content: `Kayon Designs Ltd is a construction logistics and planning consultancy based in London, United Kingdom. We provide specialized services including Construction Logistics Plans (CLPs), Swept Path Analysis, Access Plans, Traffic Management, and Tender Support to developers, contractors, and consultants across the UK.`,
  },
  {
    title: 'Our Services',
    content: `We deliver professional consultancy services in construction logistics and planning. Our work includes:

• Preparing detailed logistics documentation
• Analysing site access and constraints
• Developing traffic management strategies
• Supporting tender submissions
• Providing strategic logistics advice

Services are tailored to each project's specific requirements and local authority standards.`,
  },
  {
    title: 'How We Work Together',
    content: `When you engage our services:

• You provide project details and requirements
• We prepare a proposal outlining scope and timeline
• Upon agreement, we proceed with deliverables
• We communicate regularly throughout the project
• You receive final documents in the agreed format

Most projects operate on a fixed-fee basis. We'll discuss pricing and timelines upfront.`,
  },
  {
    title: 'Your Responsibilities',
    content: `To help us deliver excellent work:

• Provide accurate, complete project information
• Respond to queries in a timely manner
• Share relevant planning conditions and site constraints
• Brief us on your specific requirements and concerns
• Review drafts and provide constructive feedback

Clear communication from the start makes for smoother projects.`,
  },
  {
    title: 'Payment Terms',
    content: `We'll agree on fees before work begins:

• Invoices are issued upon delivery or as agreed
• Payment terms are typically 30 days from invoice
• Late payments may incur interest at the statutory rate
• We reserve the right to pause work on overdue accounts
• Quotes are valid for 30 days from issue date

We can discuss payment arrangements if needed.`,
  },
  {
    title: "What We're Not Responsible For",
    content: `Our services are consultancy-based:

• We don't supervise site work or construction activities
• We can't guarantee planning approval (councils decide that)
• We're not site engineers or construction managers
• We don't handle procurement or subcontracting
• Site conditions or unforeseen circumstances may require revisions

Our role is to provide expert planning and strategy.`,
  },
  {
    title: 'Intellectual Property',
    content: `The work we produce is created specifically for you:

• You own the rights to the final documents we deliver
• You can use them for your project, amendments, and approvals
• You can't resell our work as your own to third parties
• We retain rights to methodologies and processes we develop
• We may reference your project in our portfolio (with permission)

Let's discuss if you have specific IP requirements.`,
  },
  {
    title: 'Confidentiality',
    content: `We take confidentiality seriously:

• All project information remains strictly confidential
• We don't discuss your project details with competitors
• Team members sign confidentiality agreements
• Information is only shared when legally required
• Confidentiality continues after the project ends

Your commercial information is safe with us.`,
  },
  {
    title: 'Changes & Revisions',
    content: `Project scope management:

• Agreed scope is outlined in the proposal
• Major changes may affect fees and timelines
• We'll discuss changes and their implications with you
• Revision rounds are typically included in the fee
• Additional work beyond scope will be quoted separately

Scope clarity upfront prevents misunderstandings later.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To be clear about our responsibilities:

• We provide professional advice to the best of our ability
• We're not liable for decisions made by local authorities
• Third-party negligence isn't our responsibility
• Our liability is limited to the fees paid for the service
• In no case are we liable for indirect or consequential losses

This is standard in professional services.`,
  },
  {
    title: 'Termination',
    content: `If you need to end the engagement:

• Either party can terminate with 14 days written notice
• You pay for work completed up to termination
• Deliverables in progress will be provided as-is
• All confidential information is returned or destroyed
• No refunds for work already completed

We'll cooperate fully during any transition.`,
  },
  {
    title: 'Dispute Resolution',
    content: `If something goes wrong:

• We'll work to resolve issues informally first
• Contact us immediately with any concerns
• We'll respond within 5 business days
• Disputes are governed by English law
• Jurisdiction is the courts of England and Wales

We'd much rather sort things out fairly than go to court.`,
  },
  {
    title: 'Changes to These Terms',
    content: `We may update these terms occasionally:

• Changes apply to new engagements
• Existing projects continue under original terms
• Major changes will be notified in advance
• Continued engagement implies acceptance of new terms

We'll keep you informed if anything changes.`,
  },
];

export default function Terms() {
  const heroRef = useReveal();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-primary py-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tgrid)" />
          </svg>
        </div>
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center opacity-0 translate-y-6 transition-all duration-700"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-on-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-on-primary-container max-w-2xl mx-auto text-lg">
            Fair, straightforward terms for working together.
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
              <strong>TL;DR:</strong> We deliver professional consultancy services. You tell us what you need, we quote, you pay, we deliver. You own the final work. Everyone communicates honestly. We're both responsible for our own parts. If something goes wrong, we'll sort it out fairly. No legal tricks — just straightforward business.
            </p>
          </div>

          <div className="space-y-xl">
            {sections.map((section, idx) => (
              <div key={idx} className="border-l-4 border-secondary pl-md opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${idx * 50}ms` }}>
                <h2 className="text-2xl font-bold text-primary mb-3">{section.title}</h2>
                <p className="text-on-surface-variant whitespace-pre-line leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-xl pt-lg border-t border-outline-variant">
            <h3 className="text-xl font-bold text-primary mb-3">Questions?</h3>
            <p className="text-on-surface-variant mb-4">
              These terms are designed to be fair to everyone. If anything seems unclear or unfair, let's discuss it. We're happy to explain or adjust terms for specific situations.
            </p>
            <a
              href="mailto:hello@kayondesigns.co.uk"
              className="inline-block bg-primary text-on-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
