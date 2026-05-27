import { useEffect, useState } from 'react';
import WorkShowcaseSection from '../components/WorkShowcaseSection';
import SEO from '../components/SEO';
import api from '../services/api';
import SectionRenderer from '../components/DynamicSections/SectionRenderer';

export default function Home() {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/homepage')
      .then((res: any) => setPageData(res.data.data))
      .catch((err: any) => console.error("Failed to fetch homepage data:", err))
      .finally(() => setLoading(false));
  }, []);

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

      {pageData?.sections && pageData.sections.length > 0 ? (
        pageData.sections.map((section: any) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      ) : (
        <div className="text-center py-20 text-gray-500">
          No content configured for the homepage. Please add sections in the admin panel.
        </div>
      )}

      {/* Dynamic Work Showcase Section */}
      <div id="showcase">
        <WorkShowcaseSection />
      </div>
    </main>
  );
}
