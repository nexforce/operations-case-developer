import { Request, Response } from 'express';
import * as inventoryService from 'services/inventoryServices';

export const getItems = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const filters = {
      category: category ? String(category) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const items = await inventoryService.getAllItems(filters);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await inventoryService.getItemById(parseInt(id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching item.' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, category, price, stock } = req.body;
    const item = await inventoryService.createItem({
      name,
      category,
      price,
      stock,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating item.' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;
    const item = await inventoryService.updateItem(parseInt(id), {
      name,
      category,
      price,
      stock,
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating item.' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await inventoryService.deleteItem(parseInt(id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send('Item not found');
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting item.' });
  }
};
