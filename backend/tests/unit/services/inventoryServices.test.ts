import * as inventoryService from '../../../src/services/inventoryServices';
import * as inventoryRepository from '../../../src/repositories/inventoryRepository';
import { InventoryCreationAttributes } from '../../../src/models/inventory';

jest.mock('../../../src/repositories/inventoryRepository');

describe('Inventory Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllItems should return all items with no filters', async () => {
    const mockItems = [{ id: 1, name: 'Item 1', category: 'Category 1', price: 100, stock: 10 }];
    (inventoryRepository.getAllItems as jest.Mock).mockResolvedValue(mockItems);

    const items = await inventoryService.getAllItems();
    expect(items).toEqual(mockItems);
    expect(inventoryRepository.getAllItems).toHaveBeenCalledWith({});
  });

  test('getItemById should return an item by id', async () => {
    const mockItem = { id: 1, name: 'Item 1', category: 'Category 1', price: 100, stock: 10 };
    (inventoryRepository.getItemById as jest.Mock).mockResolvedValue(mockItem);

    const item = await inventoryService.getItemById(1);
    expect(item).toEqual(mockItem);
    expect(inventoryRepository.getItemById).toHaveBeenCalledWith(1);
  });

  test('createItem should create a new item', async () => {
    const newItem: InventoryCreationAttributes = { name: 'NewItem', category: 'NewCategory', price: 200, stock: 15 };
    const createdItem = { ...newItem, id: 1 };
    (inventoryRepository.createItem as jest.Mock).mockResolvedValue(createdItem);

    const result = await inventoryService.createItem(newItem);
    expect(result).toEqual(createdItem);
    expect(inventoryRepository.createItem).toHaveBeenCalledWith(newItem);
  });

  test('updateItem should update an existing item', async () => {
    const updatedData = { name: 'UpdatedItem' };
    const updatedItem = { id: 1, ...updatedData };
    (inventoryRepository.updateItem as jest.Mock).mockResolvedValue(updatedItem);

    const result = await inventoryService.updateItem(1, updatedData);
    expect(result).toEqual(updatedItem);
    expect(inventoryRepository.updateItem).toHaveBeenCalledWith(1, updatedData);
  });

  test('deleteItem should delete an item by id', async () => {
    (inventoryRepository.deleteItem as jest.Mock).mockResolvedValue(true);

    const result = await inventoryService.deleteItem(1);
    expect(result).toBe(true);
    expect(inventoryRepository.deleteItem).toHaveBeenCalledWith(1);
  });
});
