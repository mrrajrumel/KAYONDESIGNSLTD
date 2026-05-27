import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', response.data.token);
      navigate('/admin');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err && (err as any).response) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'Invalid credentials');
      } else if (err instanceof Error && err.message === 'Network Error') {
        setError('Cannot connect to server. Is the backend running?');
      } else {
        setError('Failed to connect to the server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafd] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary transform -skew-y-6 origin-top-left -z-10 shadow-2xl"></div>
      
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
             <span className="text-white font-black text-2xl tracking-tighter">KD</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-gray-500 font-medium">Sign in to manage the Kayon Designs platform</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-900 bg-gray-50 focus:bg-white"
              required
              placeholder="admin@kayondesigns.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-gray-900 bg-gray-50 focus:bg-white"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 rounded-xl text-sm font-black text-white bg-primary hover:bg-primary-container focus:outline-none transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 mt-4"
          >
            {loading ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
