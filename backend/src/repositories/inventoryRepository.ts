import { Op } from 'sequelize';
import Inventory, { InventoryCreationAttributes } from 'models/inventory';

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getAllItems = async (filters: FilterOptions = {}) => {
  const { category, minPrice, maxPrice } = filters;
  const where: any = {};

  if (category) {
    where.category = category;
  }

  if (minPrice !== undefined) {
    where.price = { ...where.price, [Op.gte]: minPrice };
  }

  if (maxPrice !== undefined) {
    where.price = { ...where.price, [Op.lte]: maxPrice };
  }

  return await Inventory.findAll({ where });
};

export const getItemById = async (id: number) => {
  return await Inventory.findByPk(id);
};

export const createItem = async (itemData: InventoryCreationAttributes) => {
  return await Inventory.create(itemData);
};

export const updateItem = async (
  id: number,
  itemData: Partial<InventoryCreationAttributes>,
) => {
  const item = await Inventory.findByPk(id);
  if (item) {
    return await item.update(itemData);
  }
  return null;
};

export const deleteItem = async (id: number) => {
  const item = await Inventory.findByPk(id);
  if (item) {
    await item.destroy();
    return true;
  }
  return false;
};
