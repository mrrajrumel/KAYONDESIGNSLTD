import { Link } from 'react-router-dom';

export default function CTASection({ data }: { data: any }) {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold">{data?.title || 'Ready to start?'}</h2>
        <p className="text-xl text-primary-foreground/90">{data?.description}</p>
        {data?.buttonUrl && data?.buttonText && (
          <Link to={data.buttonUrl} className="inline-flex items-center px-8 py-4 bg-white text-primary rounded font-bold hover:bg-gray-100 transition-colors">
            {data.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
