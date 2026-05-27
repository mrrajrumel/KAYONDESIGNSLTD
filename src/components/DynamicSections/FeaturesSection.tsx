export default function FeaturesSection({ data }: { data: any }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {data?.title && <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>}
        <div className="grid md:grid-cols-3 gap-8">
          {data?.items?.map((item: any, idx: number) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc || item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
