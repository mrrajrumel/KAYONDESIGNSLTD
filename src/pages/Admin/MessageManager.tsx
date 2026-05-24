import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import useApi from '../../hooks/useApi';

export default function MessageManager() {
  const { data: messages, loading, deleteItem, updateItem } = useApi<any>({ initialUrl: '/contact-messages' });

  const markAsRead = async (id: number) => {
    try {
      // We do an optimistic update here for faster UI feedback
      await updateItem(`/contact-messages/${id}/read`, { is_read: true });
    } catch (err) {
      // error handled by hook
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    await deleteItem(`/contact-messages/${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Contact Messages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Sender</th>
              <th className="px-6 py-3 font-medium">Subject</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <tr key={msg.id} className={`hover:bg-gray-50 ${!msg.is_read ? 'bg-blue-50/30 font-semibold text-gray-900' : ''}`}>
                <td className="px-6 py-4">
                  {msg.is_read ? <MailOpen size={18} className="text-gray-400" /> : <Mail size={18} className="text-blue-600" />}
                </td>
                <td className="px-6 py-4">
                  <div>{msg.name}</div>
                  <div className="text-xs text-gray-500 font-normal">{msg.email}</div>
                </td>
                <td className="px-6 py-4 truncate max-w-xs">{msg.subject || 'No Subject'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  {!msg.is_read && (
                    <button onClick={() => markAsRead(msg.id)} className="text-blue-600 hover:underline text-xs">
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
