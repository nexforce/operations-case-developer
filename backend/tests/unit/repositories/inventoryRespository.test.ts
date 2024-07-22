import { getAllItems, getItemById, createItem, updateItem, deleteItem, FilterOptions } from '../../../src/repositories/inventoryRepository';
import sequelize from '../../../src/config/database';
import Inventory from '../../../src/models/inventory';

describe('Inventory Repository', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });

  afterEach(async () => {
    await Inventory.destroy({ where: {}, truncate: true }); 
  });

  test('getAllItems should return all items with no filters', async () => {
    await Inventory.create({
      id: 1,
      name: 'Item 1',
      category: 'Category 1',
      price: 100,
      stock: 10,
    });

    const items = await getAllItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Item 1');
  });

  test('getAllItems should return filtered items', async () => {
    await Inventory.create({
      id: 1,
      name: 'Item 1',
      category: 'Category 1',
      price: 100,
      stock: 10,
    });

    const filter: FilterOptions = { category: 'Category 1', minPrice: 50, maxPrice: 150 };
    const items = await getAllItems(filter);
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Item 1');
  });

  test('getItemById should return an item by id', async () => {
    await Inventory.create({
      id: 1,
      name: 'Item 1',
      category: 'Category 1',
      price: 100,
      stock: 10,
    });

    const item = await getItemById(1);
    expect(item).toBeDefined();
    expect(item?.name).toBe('Item 1');
  });

  test('createItem should create a new item', async () => {
    const newItem = { name: 'NewItem', category: 'NewCategory', price: 200, stock: 15 };
    const createdItem = await createItem(newItem);
    expect(createdItem.name).toBe('NewItem');
  });

  test('updateItem should update an existing item', async () => {
    await Inventory.create({
      id: 1,
      name: 'Item 1',
      category: 'Category 1',
      price: 100,
      stock: 10,
    });

    const updatedItem = await updateItem(1, { name: 'UpdatedItem' });
    expect(updatedItem?.name).toBe('UpdatedItem');
  });

  test('deleteItem should delete an item by id', async () => {
    await Inventory.create({
      id: 1,
      name: 'Item 1',
      category: 'Category 1',
      price: 100,
      stock: 10,
    });

    const isDeleted = await deleteItem(1);
    expect(isDeleted).toBe(true);
  });
});
