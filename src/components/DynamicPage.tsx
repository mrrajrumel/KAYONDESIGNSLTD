import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import SEO from './SEO';
import SectionRenderer from './DynamicSections/SectionRenderer';

export default function DynamicPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/public/pages/${slug}`)
      .then((res: any) => setPageData(res.data.data))
      .catch((err: any) => {
        console.error("Failed to fetch page:", err);
        setPageData(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The page you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      <SEO title={pageData.title} />
      
      {pageData.sections && pageData.sections.length > 0 ? (
        pageData.sections.map((section: any) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      ) : (
        <div dangerouslySetInnerHTML={{ __html: pageData.content }} className="max-w-7xl mx-auto px-4 py-12 prose max-w-none" />
      )}
    </main>
  );
}
