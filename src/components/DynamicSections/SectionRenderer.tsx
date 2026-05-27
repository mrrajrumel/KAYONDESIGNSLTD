import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import CTASection from './CTASection';

const componentMap: Record<string, React.FC<any>> = {
  hero: HeroSection,
  features: FeaturesSection,
  cta: CTASection,
  services_list: FeaturesSection,
  values_list: FeaturesSection,
  qualities_list: FeaturesSection,
  // Add more as needed
};

export default function SectionRenderer({ section }: { section: any }) {
  const Component = componentMap[section.type];

  if (!Component) {
    return <div className="py-10 text-center text-red-500">Unknown section type: {section.type}</div>;
  }

  return <Component data={section.content} />;
}
