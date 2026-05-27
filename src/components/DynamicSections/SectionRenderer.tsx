import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CTASection from './CTASection';
import ContactSection from './ContactSection';

const componentMap: Record<string, React.FC<any>> = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CTASection,
  services_list: FeaturesSection,
  values_list: FeaturesSection,
  qualities_list: FeaturesSection,
  contact: ContactSection,
  // Add more as needed
};

export default function SectionRenderer({ section }: { section: any }) {
  const Component = componentMap[section.type];

  if (!Component) {
    return <div className="py-10 text-center text-red-500">Unknown section type: {section.type}</div>;
  }

  // Create an ID based on section name so hash links (/#about) scroll perfectly to it
  const sectionId = section.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `section-${section.id}`;

  return (
    <div id={sectionId}>
      <Component data={section.content} />
    </div>
  );
}
