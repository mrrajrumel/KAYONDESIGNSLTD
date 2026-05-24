import { Edit, Trash2, Plus, X, Shield, ShieldAlert } from 'lucide-react';
import useApi from '../../hooks/useApi';
import { useState, useEffect } from 'react';

export default function UserManager() {
  const { data: users, loading, deleteItem, createItem, updateItem } = useApi<any>({ initialUrl: '/admins' });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Admin',
    is_active: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Handled by useApi
  };

  const openModal = (item: any = null) => {
    if (item) {
      setEditingUser(item);
      setFormData({
        name: item.name,
        username: item.username,
        email: item.email,
        password: '',
        role: item.role,
        is_active: item.is_active,
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', username: '', email: '', password: '', role: 'Admin', is_active: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData };
      if (!data.password) delete (data as any).password;

      if (editingUser) {
        await updateItem(`/admins/${editingUser.id}`, data);
      } else {
        await createItem('/admins', data);
      }
      setIsModalOpen(false);
    } catch (err) {
      // Errors handled by hook
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to remove this administrator?')) return;
    await deleteItem(`/admins/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Administrator Accounts</h3>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
            <Plus size={16} /> Add Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Username</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 w-fit px-2 py-1 rounded text-xs font-medium ${user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {user.role === 'Super Admin' ? <Shield size={12} /> : <ShieldAlert size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openModal(user)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <Edit size={18} />
                    </button>
                    {user.role !== 'Super Admin' && (
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{editingUser ? 'Edit Administrator' : 'Add New Administrator'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{editingUser ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required={!editingUser} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary outline-none">
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Content Manager">Content Manager</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-primary rounded" />
                    <span className="text-sm font-medium text-gray-700">Account Active</span>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-primary text-white py-2 rounded font-medium hover:opacity-90">{editingUser ? 'Update Account' : 'Create Account'}</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded font-medium hover:bg-gray-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
