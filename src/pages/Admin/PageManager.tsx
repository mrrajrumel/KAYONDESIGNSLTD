import toast from 'react-hot-toast';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { Page } from '../../types';

export default function PageManager() {
  const { data: pages, loading, deleteItem, createItem, updateItem } = useApi<Page>({ initialUrl: '/pages' });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    is_home: false,
  });

  const fetchPages = async () => {
    // Handled by useApi
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const openModal = (page: Page | null = null) => {
    if (page) {
      setEditPage(page);
      setFormData({
        title: page.title,
        slug: page.slug,
        status: page.status,
        is_home: page.is_home,
      });
    } else {
      setEditPage(null);
      setFormData({ title: '', slug: '', status: 'draft', is_home: false });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await updateItem(`/pages/${editingPage.id}`, formData);
      } else {
        await createItem('/pages', formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Errors are handled by the hook
    }
  };

  const deletePage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    await deleteItem(`/pages/${id}`);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">All Pages</h3>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
            <Plus size={16} /> Create Page
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Slug</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{page.title}</td>
                  <td className="px-6 py-4">{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openModal(page)}
                      className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deletePage(page.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No pages found. Create one to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{editingPage ? 'Edit Page' : 'Create New Page'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={handleTitleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" 
                  placeholder="e.g. Services"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.is_home} 
                      onChange={e => setFormData({...formData, is_home: e.target.checked})}
                      className="w-4 h-4 text-primary rounded" 
                    />
                    <span className="text-sm font-medium text-gray-700">Set as Home Page</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-primary text-white py-2 rounded font-medium hover:opacity-90">
                  {editingPage ? 'Update Page' : 'Create Page'}
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
