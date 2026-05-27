import { Link } from 'react-router-dom';

export default function CTASection({ data }: { data: any }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">{data?.title || 'Ready to start?'}</h2>
        <p className="text-xl md:text-2xl text-primary-fixed-dim/90 max-w-3xl mx-auto font-medium leading-relaxed">
          {data?.description}
        </p>
        {data?.buttonUrl && data?.buttonText && (
          <div className="pt-4">
            <Link to={data.buttonUrl} className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-on-secondary-fixed rounded-xl font-bold text-lg hover:bg-secondary-fixed hover:scale-105 transition-all duration-300 shadow-xl shadow-secondary/20">
              {data.buttonText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
