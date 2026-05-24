import { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function ShowcaseManager() {
  const { data: showcases, loading, deleteItem, createItem, updateItem } = useApi<any>({ initialUrl: '/showcases' });
  const { data: categories } = useApi<any>({ initialUrl: '/categories' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    is_featured: false,
    status: true,
    featured_image: '',
  });

  useEffect(() => {
    // Initial data loading
  }, []);

  const openModal = (item: any = null) => {
    if (item) {
      setEditingShowcase(item);
      setFormData({
        title: item.title,
        slug: item.slug,
        description: item.description || '',
        category_id: item.category_id || '',
        is_featured: item.is_featured,
        status: item.status,
        featured_image: item.featured_image || '',
      });
    } else {
      setEditingShowcase(null);
      setFormData({ 
        title: '', 
        slug: '', 
        description: '', 
        category_id: '', 
        is_featured: false, 
        status: true, 
        featured_image: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, category_id: formData.category_id || null };
      if (editingShowcase) {
        await updateItem(`/showcases/${editingShowcase.id}`, payload);
      } else {
        await createItem('/showcases', payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Errors handled by hook
    }
  };

  const deleteShowcase = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await deleteItem(`/showcases/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Work Showcases</h3>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
            <Plus size={16} /> Add Project
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Featured</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {showcases.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {item.featured_image ? (
                      <img src={item.featured_image} alt={item.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4">{item.category?.title || 'Uncategorized'}</td>
                  <td className="px-6 py-4">
                    {item.is_featured ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">Featured</span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openModal(item)}
                      className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteShowcase(item.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {showcases.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No showcase projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{editingShowcase ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none bg-gray-50" 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={formData.category_id} 
                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none">
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                  <input 
                    type="text" 
                    value={formData.featured_image} 
                    onChange={e => setFormData({...formData, featured_image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" 
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none"
                ></textarea>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.is_featured} 
                    onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-4 h-4 text-primary rounded" 
                  />
                  <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.checked})}
                    className="w-4 h-4 text-primary rounded" 
                  />
                  <span className="text-sm font-medium text-gray-700">Published Status</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3 sticky bottom-0 bg-white">
                <button 
                  type="submit" 
                  className="flex-1 bg-primary text-white py-2 rounded font-medium hover:opacity-90">
                  {editingShowcase ? 'Update Project' : 'Add Project'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
