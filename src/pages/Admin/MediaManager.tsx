import { Trash2, UploadCloud, Copy, ExternalLink } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { useRef } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Media } from '../../types';

export default function MediaManager() {
  const { data: media, loading, deleteItem, fetchData } = useApi<Media>({ initialUrl: '/media' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files[]', e.target.files[i]);
    }

    const toastId = toast.loading('Uploading...');
    try {
      await api.post('/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Upload complete', { id: toastId });
      fetchData();
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  const deleteMedia = async (id: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    await deleteItem(`/media/${id}`);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Media Library</h3>
        <div>
          <input 
            type="file" 
            multiple 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90"
          >
            <UploadCloud size={18} /> Upload Files
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(file => (
          <div key={file.id} className="relative group rounded-lg border border-gray-200 overflow-hidden bg-gray-50 aspect-square flex flex-col items-center justify-center">
            {file.file_type?.startsWith('image/') ? (
              <img src={file.file_path} alt={file.alt_text || file.file_name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 font-medium truncate w-full text-center px-2">{file.file_name}</div>
            )}
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button onClick={() => copyToClipboard(file.file_path)} className="p-2 bg-white rounded-full hover:bg-gray-200 text-gray-900" title="Copy URL">
                <Copy size={16} />
              </button>
              <a href={file.file_path} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-200 text-blue-600" title="View">
                <ExternalLink size={16} />
              </a>
              <button onClick={() => deleteMedia(file.id)} className="p-2 bg-white rounded-full hover:bg-gray-200 text-red-600" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {media.length === 0 && (
        <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg mt-4">
          <UploadCloud size={48} className="mx-auto mb-4 opacity-50" />
          <p>No media files uploaded yet.</p>
          <button onClick={() => fileInputRef.current?.click()} className="mt-2 text-primary hover:underline">Click to upload</button>
        </div>
      )}
    </div>
  );
}
