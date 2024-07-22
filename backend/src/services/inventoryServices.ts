import * as inventoryRepository from 'repositories/inventoryRepository';
import { InventoryCreationAttributes } from 'models/inventory';

export const getAllItems = async (
  filters: inventoryRepository.FilterOptions = {},
) => {
  return await inventoryRepository.getAllItems(filters);
};

export const getItemById = async (id: number) => {
  return await inventoryRepository.getItemById(id);
};

export const createItem = async (itemData: InventoryCreationAttributes) => {
  return await inventoryRepository.createItem(itemData);
};

export const updateItem = async (
  id: number,
  itemData: Partial<InventoryCreationAttributes>,
) => {
  return await inventoryRepository.updateItem(id, itemData);
};

export const deleteItem = async (id: number) => {
  return await inventoryRepository.deleteItem(id);
};
