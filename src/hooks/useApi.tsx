import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

interface UseApiOptions {
  initialUrl: string;
}

export default function useApi<T>({ initialUrl }: UseApiOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchData = useCallback(async (url = initialUrl) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data.data?.data || res.data.data || []);
      if (res.data.data?.last_page) {
        setPagination({
          currentPage: res.data.data.current_page,
          lastPage: res.data.data.last_page,
          perPage: res.data.data.per_page,
          total: res.data.data.total,
        });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [initialUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createItem = async (url: string, itemData: any) => {
    try {
      await api.post(url, itemData);
      toast.success('Item created successfully');
      fetchData(); // Refresh data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateItem = async (url: string, itemData: any) => {
    try {
      await api.put(url, itemData);
      toast.success('Item updated successfully');
      fetchData(); // Refresh data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update item';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteItem = async (url: string) => {
    try {
      await api.delete(url);
      toast.success('Item deleted successfully');
      fetchData(); // Refresh data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete item';
      toast.error(errorMessage);
      throw err;
    }
  };

  return { data, loading, error, pagination, fetchData, createItem, updateItem, deleteItem };
}
