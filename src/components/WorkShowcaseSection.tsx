import { useEffect, useState } from 'react';
import api from '../services/api';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkShowcaseSection() {
  const [showcases, setShowcases] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/showcases'),
      api.get('/categories')
    ]).then(([showcaseRes, categoryRes]) => {
      setShowcases(showcaseRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const filteredShowcases = activeCategory 
    ? showcases.filter(item => item.category_id === activeCategory)
    : showcases;

  if (loading) return <div className="py-20 text-center">Loading portfolio...</div>;

  return (
    <section className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Featured Work</h2>
            <p className="text-lg text-on-surface-variant">Explore our latest logistics and planning successes.</p>
          </div>
          <Link to="/planning" className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>

        {/* Categories Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-4 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${activeCategory === null ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface border-outline hover:border-primary'}`}
          >
            All Projects
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all ${activeCategory === cat.id ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface border-outline hover:border-primary'}`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowcases.map(item => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                {item.featured_image ? (
                  <img src={item.featured_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="p-6">
                <span className="text-sm font-semibold text-secondary mb-2 block uppercase tracking-wider">{item.category?.title}</span>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-on-surface-variant line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
          {filteredShowcases.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
