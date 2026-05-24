import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Paginated } from '../types';

interface UseApiOptions {
  initialUrl: string;
}

export default function useApi<T>({ initialUrl }: UseApiOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Omit<Paginated<T>, 'data'> | null>(null);

  const fetchData = useCallback(async (url = initialUrl) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<{ data: T[] | Paginated<T> }>(url);

      if ('current_page' in res.data.data) {
        // It's Paginated
        const paginatedData = res.data.data;
        setData(paginatedData.data);
        const { data: _, ...paginationData } = paginatedData;
        setPagination(paginationData);
      } else {
        // It's a simple array
        setData(res.data.data as T[]);
        setPagination(null);
      }
    } catch (err) {
      const e = err as any;
      const errorMessage = e.response?.data?.message || 'Failed to fetch data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [initialUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createItem = async (url: string, itemData: Partial<T>) => {
    try {
      await api.post(url, itemData);
      toast.success('Item created successfully');
      await fetchData(); // Refresh data
    } catch (err) {
      const e = err as any;
      const errorMessage = e.response?.data?.message || 'Failed to create item';
      toast.error(errorMessage);
      throw e;
    }
  };

  const updateItem = async (url: string, itemData: Partial<T>) => {
    try {
      await api.put(url, itemData);
      toast.success('Item updated successfully');
      await fetchData(); // Refresh data
    } catch (err) {
      const e = err as any;
      const errorMessage = e.response?.data?.message || 'Failed to update item';
      toast.error(errorMessage);
      throw e;
    }
  };

  const deleteItem = async (url: string) => {
    try {
      await api.delete(url);
      toast.success('Item deleted successfully');
      await fetchData(); // Refresh data
    } catch (err) {
      const e = err as any;
      const errorMessage = e.response?.data?.message || 'Failed to delete item';
      toast.error(errorMessage);
      throw e;
    }
  };

  return { data, loading, error, pagination, fetchData, createItem, updateItem, deleteItem };
}
