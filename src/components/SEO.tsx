import { Helmet } from 'react-helmet-async';
import { useSettingsStore } from '../store/useSettingsStore';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export default function SEO({ title, description, keywords, image, type = 'website' }: SEOProps) {
  const { siteName, siteDescription, logo } = useSettingsStore();

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = description || siteDescription;
  const seoImage = image || logo;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={type} />
      {seoImage && <meta property="og:image" content={seoImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}
    </Helmet>
  );
}
