export default function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {data?.title && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight mb-4">{data.title}</h2>
            {data?.description && (
              <p className="text-lg text-on-surface-variant leading-relaxed">{data.description}</p>
            )}
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {data?.items?.map((item: any, idx: number) => (
            <div key={idx} className="group p-8 bg-surface rounded-2xl border border-outline-variant/30 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              {item.icon && (
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {/* You could render dynamic lucide icons here if stored in DB, fallback to generic shape */}
                  <div className="w-6 h-6 bg-primary rounded-sm opacity-80 rotate-45"></div>
                </div>
              )}
              <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors">{item.title}</h3>
              <p className="text-on-surface-variant leading-relaxed font-medium">{item.desc || item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
