import request from 'supertest';
import express, { Application } from 'express';
import * as inventoryController from '../../../src/controllers/inventoryController';
import * as inventoryService from '../../../src/services/inventoryServices';

const app: Application = express();
app.use(express.json());

app.get('/items', inventoryController.getItems);
app.get('/items/:id', inventoryController.getItem);
app.post('/items', inventoryController.createItem);
app.put('/items/:id', inventoryController.updateItem);
app.delete('/items/:id', inventoryController.deleteItem);

jest.mock('../../../src/services/inventoryServices');

describe('Inventory Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /items should return all items', async () => {
    const mockItems = [{ id: 1, name: 'Item 1', category: 'Category 1', price: 100, stock: 10 }];
    (inventoryService.getAllItems as jest.Mock).mockResolvedValue(mockItems);

    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
    expect(inventoryService.getAllItems).toHaveBeenCalledWith({});
  });

  test('GET /items should return items with filters', async () => {
    const mockItems = [{ id: 1, name: 'Item 1', category: 'Category 1', price: 100, stock: 10 }];
    const filters = { category: 'Category 1', minPrice: 50, maxPrice: 150 };
    (inventoryService.getAllItems as jest.Mock).mockResolvedValue(mockItems);

    const response = await request(app).get('/items').query(filters);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
    expect(inventoryService.getAllItems).toHaveBeenCalledWith(filters);
  });

  test('GET /items should return 500 if service fails with filters', async () => {
    const filters = { category: 'Category 1', minPrice: 50, maxPrice: 150 };
    (inventoryService.getAllItems as jest.Mock).mockRejectedValue(new Error('Service Error'));

    const response = await request(app).get('/items').query(filters);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while fetching items.' });
    expect(inventoryService.getAllItems).toHaveBeenCalledWith(filters);
  });

  test('GET /items/:id should return an item by id', async () => {
    const mockItem = { id: 1, name: 'Item 1', category: 'Category 1', price: 100, stock: 10 };
    (inventoryService.getItemById as jest.Mock).mockResolvedValue(mockItem);

    const response = await request(app).get('/items/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItem);
    expect(inventoryService.getItemById).toHaveBeenCalledWith(1);
  });

  test('GET /items/:id should return 500 if service fails', async () => {
    (inventoryService.getItemById as jest.Mock).mockRejectedValue(new Error('Service Error'));

    const response = await request(app).get('/items/1');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while fetching item.' });
    expect(inventoryService.getItemById).toHaveBeenCalledWith(1);
  });

  test('POST /items should create a new item', async () => {
    const newItem = { name: 'NewItem', category: 'NewCategory', price: 200, stock: 15 };
    const createdItem = { ...newItem, id: 1 };
    (inventoryService.createItem as jest.Mock).mockResolvedValue(createdItem);

    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdItem);
    expect(inventoryService.createItem).toHaveBeenCalledWith(newItem);
  });

  test('POST /items should return 500 if service fails', async () => {
    const newItem = { name: 'NewItem', category: 'NewCategory', price: 200, stock: 15 };
    (inventoryService.createItem as jest.Mock).mockRejectedValue(new Error('Service Error'));

    const response = await request(app).post('/items').send(newItem);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while creating item.' });
    expect(inventoryService.createItem).toHaveBeenCalledWith(newItem);
  });

  test('PUT /items/:id should update an existing item', async () => {
    const updatedData = { name: 'UpdatedItem' };
    const updatedItem = { id: 1, ...updatedData };
    (inventoryService.updateItem as jest.Mock).mockResolvedValue(updatedItem);

    const response = await request(app).put('/items/1').send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedItem);
    expect(inventoryService.updateItem).toHaveBeenCalledWith(1, updatedData);
  });

  test('PUT /items/:id should return 500 if service fails', async () => {
    const updatedData = { name: 'UpdatedItem' };
    (inventoryService.updateItem as jest.Mock).mockRejectedValue(new Error('Service Error'));

    const response = await request(app).put('/items/1').send(updatedData);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while updating item.' });
    expect(inventoryService.updateItem).toHaveBeenCalledWith(1, updatedData);
  });

  test('DELETE /items/:id should delete an item by id', async () => {
    (inventoryService.deleteItem as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete('/items/1');
    expect(response.status).toBe(204);
    expect(inventoryService.deleteItem).toHaveBeenCalledWith(1);
  });

  test('DELETE /items/:id should return 500 if service fails', async () => {
    (inventoryService.deleteItem as jest.Mock).mockRejectedValue(new Error('Service Error'));

    const response = await request(app).delete('/items/1');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'An error occurred while deleting item.' });
    expect(inventoryService.deleteItem).toHaveBeenCalledWith(1);
  });

  test('GET /items/:id should return 404 if item not found', async () => {
    (inventoryService.getItemById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/items/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Item not found');
    expect(inventoryService.getItemById).toHaveBeenCalledWith(999);
  });

  test('PUT /items/:id should return 404 if item not found', async () => {
    (inventoryService.updateItem as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put('/items/999').send({ name: 'NonExistentItem' });
    expect(response.status).toBe(404);
    expect(response.text).toBe('Item not found');
    expect(inventoryService.updateItem).toHaveBeenCalledWith(999, { name: 'NonExistentItem' });
  });

  test('DELETE /items/:id should return 404 if item not found', async () => {
    (inventoryService.deleteItem as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete('/items/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Item not found');
    expect(inventoryService.deleteItem).toHaveBeenCalledWith(999);
  });
});
