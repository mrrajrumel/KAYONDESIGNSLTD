import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Settings } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function PageBuilder({ pageId, onBack }: { pageId: number, onBack: () => void }) {
  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<any>(null);

  useEffect(() => {
    fetchPage();
  }, [pageId]);

  const fetchPage = async () => {
    try {
      const res = await api.get(`/pages/${pageId}`);
      setPage(res.data.data);
      setSections(res.data.data.sections || []);
    } catch (err) {
      toast.error('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  const addSection = async (type: string) => {
    const newSection = {
      page_id: pageId,
      name: type.replace('_', ' ').toUpperCase(),
      type: type,
      order: sections.length,
      is_active: true,
      content: { title: 'New ' + type, description: 'Enter description here...' }
    };
    
    try {
      const res = await api.post('/sections', newSection);
      setSections([...sections, res.data.data]);
      toast.success('Section added');
    } catch (err) {
      toast.error('Failed to add section');
    }
  };

  const deleteSection = async (id: number) => {
    if (!confirm('Delete this section?')) return;
    try {
      await api.delete(`/sections/${id}`);
      setSections(sections.filter(s => s.id !== id));
      toast.success('Section deleted');
    } catch (err) {
      toast.error('Failed to delete section');
    }
  };

  const saveSectionContent = async (id: number, content: any) => {
    try {
      await api.put(`/sections/${id}`, { content });
      toast.success('Section saved');
      setEditingSection(null);
      fetchPage();
    } catch (err) {
      toast.error('Failed to save section');
    }
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    
    // Update order values
    newSections.forEach((sec, i) => sec.order = i);
    setSections(newSections);

    try {
      await api.post('/sections/reorder', {
        sections: newSections.map(s => ({ id: s.id, order: s.order }))
      });
      toast.success('Sections reordered');
    } catch (err) {
      toast.error('Failed to reorder sections');
    }
  };

  if (loading) return <div>Loading Builder...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="p-2.5 bg-gray-50 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Page Builder: {page?.title}</h2>
            <p className="text-sm font-medium text-gray-500 mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live URL: <span className="text-primary bg-primary/5 px-2 py-0.5 rounded ml-1">/{page?.slug}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <select 
            className="border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer bg-gray-50 hover:bg-white"
            onChange={(e) => { if(e.target.value) addSection(e.target.value); e.target.value = ''; }}
          >
            <option value="">+ Add New Section</option>
            <option value="hero">⭐ Hero Section</option>
            <option value="features">📋 Features Grid</option>
            <option value="cta">🎯 Call to Action</option>
            <option value="services_list">🛠️ Services List</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section, index) => (
            <div key={section.id} className={`bg-white p-5 rounded-2xl shadow-sm border-2 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${editingSection?.id === section.id ? 'border-primary shadow-primary/10' : 'border-gray-100 hover:border-gray-200'}`}>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1 text-gray-300">
                  <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="hover:text-primary disabled:opacity-20 transition-colors">▲</button>
                  <button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="hover:text-primary disabled:opacity-20 transition-colors">▼</button>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg tracking-tight">{section.name}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest bg-gray-100 px-2.5 py-1 rounded-md text-gray-500 mt-1 inline-block">{section.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setEditingSection(section)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${editingSection?.id === section.id ? 'bg-primary text-white shadow-md' : 'text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100'}`}>
                  <Settings size={16} /> Edit Content
                </button>
                <button 
                  onClick={() => deleteSection(section.id)}
                  className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors border border-transparent hover:border-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {sections.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 text-gray-400">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings size={24} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Sections Yet</h3>
              <p className="text-sm font-medium">Select a section from the dropdown above to start building.</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 h-fit sticky top-28">
          <h3 className="text-xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Settings size={18} />
            </span>
            {editingSection ? `Edit: ${editingSection.name}` : 'Editor Panel'}
          </h3>
          
          {editingSection ? (
            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (HTML Supported)</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    defaultValue={editingSection.content?.title || ''}
                    id="field-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description / Subtitle</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded h-24" 
                    defaultValue={editingSection.content?.description || editingSection.content?.desc || ''}
                    id="field-desc"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    defaultValue={editingSection.content?.backgroundImage || ''}
                    id="field-bg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    defaultValue={editingSection.content?.buttonText || ''}
                    id="field-btn-text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded" 
                    defaultValue={editingSection.content?.buttonUrl || ''}
                    id="field-btn-url"
                  />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advanced: Raw JSON Content</label>
                  <textarea 
                    className="w-full h-32 p-3 border border-gray-300 rounded font-mono text-xs"
                    defaultValue={JSON.stringify(editingSection.content, null, 2)}
                    id="json-editor"
                  ></textarea>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  try {
                    const parsed = JSON.parse((document.getElementById('json-editor') as HTMLTextAreaElement).value);
                    
                    // Merge visual fields
                    parsed.title = (document.getElementById('field-title') as HTMLInputElement).value;
                    parsed.description = (document.getElementById('field-desc') as HTMLTextAreaElement).value;
                    parsed.backgroundImage = (document.getElementById('field-bg') as HTMLInputElement).value;
                    parsed.buttonText = (document.getElementById('field-btn-text') as HTMLInputElement).value;
                    parsed.buttonUrl = (document.getElementById('field-btn-url') as HTMLInputElement).value;
                    
                    saveSectionContent(editingSection.id, parsed);
                  } catch (e) {
                    toast.error('Invalid JSON in Advanced Editor');
                  }
                }}
                className="w-full flex justify-center items-center gap-2 bg-primary text-white py-2 rounded hover:bg-primary/90 mt-4">
                <Save size={18} /> Save Changes
              </button>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              Select a section to edit its content.
              <br /><br />
              <p>For now, you can edit the raw JSON structure of each widget directly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
