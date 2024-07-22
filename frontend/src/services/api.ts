import axios from 'axios';

import { InventoryItem } from 'hooks/useInventory';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export interface dataFilter {
  category: string;
  minPrice: string;
  maxPrice: string;
}

export const fetchInventoryItems = async (data?: dataFilter) => {
  const response = await api.get('/inventory/', {
    params: { ...data },
  });

  return response.data;
};

export const fetchInventoryItem = async (id: number) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

export const addItem = async (item: Partial<InventoryItem>) => {
  const response = await api.post('/inventory/', item);
  return response.data;
};

export const updateItem = async (item: Partial<InventoryItem>) => {
  const response = await api.put(`/inventory/${item.id}`, item);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};

export const downloadReport = async () => {
  const response = await api.get('/relatory', {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'inventory_report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
