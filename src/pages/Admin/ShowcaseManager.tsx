import { Edit, Trash2, Plus, Image as ImageIcon, X, Upload } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function ShowcaseManager() {
  const { data: showcases, loading, deleteItem, createItem, updateItem, fetchData } = useApi<any>({ initialUrl: '/showcases' });
  const { data: categories } = useApi<any>({ initialUrl: '/categories' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowcase, setEditingShowcase] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category_id: '',
    is_featured: false,
    status: true,
    featured_image: '',
  });

  // Initial data loading handled by useApi hook.

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('files[]', file);

    setIsUploading(true);
    const toastId = toast.loading('Uploading image...');
    
    try {
      const res = await api.post('/media', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const uploadedUrl = res.data.data[0].file_path;
      setFormData(prev => ({ ...prev, featured_image: uploadedUrl }));
      toast.success('Image uploaded successfully', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image', { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                  <div className="flex flex-col gap-3">
                    {formData.featured_image && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                        <img src={formData.featured_image} alt="Featured" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, featured_image: ''})}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    <div className={`border-2 border-dashed ${formData.featured_image ? 'border-gray-200 bg-gray-50' : 'border-primary/30 bg-primary/5'} rounded-lg p-6 text-center hover:bg-primary/10 transition-colors cursor-pointer relative`}>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                        {isUploading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        ) : (
                          <>
                            <Upload size={24} className="text-primary" />
                            <span className="text-sm font-medium">{formData.featured_image ? 'Change Image' : 'Click or drag image to upload'}</span>
                            <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
