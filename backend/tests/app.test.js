import { getItems, postItem, updateItem, deleteItem, getCategories } from '../controllers/hardwareController';
import Hardware from '../models/hardwareSchema';
import hubspotPrivateApp from '../hubspot/hubspotConnection';

jest.mock('../models/hardwareSchema');
jest.mock('../hubspot/hubspotConnection');

describe('Hardware Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getItems', () => {
    it('should return hardware and hubspot data', async () => {
      Hardware.find.mockResolvedValue([{ name: 'Item1' }]);
      hubspotPrivateApp.get.mockResolvedValue({ data: 'HubSpot Data' });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getItems(req, res);

      expect(Hardware.find).toHaveBeenCalled();
      expect(hubspotPrivateApp.get).toHaveBeenCalledWith('/crm/v3/objects/hardwares');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        hardware: [{ name: 'Item1' }],
        hubspotData: 'HubSpot Data'
      });
    });

    it('should handle errors', async () => {
      Hardware.find.mockRejectedValue(new Error('Database error'));
      hubspotPrivateApp.get.mockRejectedValue(new Error('HubSpot error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getItems(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error to get Items', error: expect.any(Error) });
    });
  });

  describe('postItem', () => {
    it('should handle errors', async () => {
      Hardware.create.mockRejectedValue(new Error('Database error'));
      hubspotPrivateApp.post.mockRejectedValue(new Error('HubSpot error'));

      const req = { body: { name: 'New Item' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await postItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error to create Item', error: expect.any(Error) });
    });
  });

  describe('updateItem', () => {
    it('should handle errors', async () => {
      Hardware.findById.mockRejectedValue(new Error('Database error'));
      hubspotPrivateApp.patch.mockRejectedValue(new Error('HubSpot error'));

      const req = { params: { id: '123' }, body: { name: 'Updated Item' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await updateItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error to update Item', error: expect.any(Error) });
    });
  });

  describe('deleteItem', () => {
    it('should delete an existing hardware item', async () => {
      Hardware.findById.mockResolvedValue({ _id: '123', hubspotId: 'hubspot-id' });
      hubspotPrivateApp.delete.mockResolvedValue({});
      Hardware.findByIdAndDelete.mockResolvedValue({});

      const req = { params: { id: '123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteItem(req, res);

      expect(Hardware.findById).toHaveBeenCalledWith('123');
      expect(hubspotPrivateApp.delete).toHaveBeenCalledWith('/crm/v3/objects/hardwares/hubspot-id');
      expect(Hardware.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Item deleted successfully' });
    });

    it('should handle errors', async () => {
      Hardware.findById.mockRejectedValue(new Error('Database error'));
      hubspotPrivateApp.delete.mockRejectedValue(new Error('HubSpot error'));

      const req = { params: { id: '123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await deleteItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error to delete Item', error: expect.any(Error) });
    });
  });

  describe('getCategories', () => {
    it('should return distinct categories', async () => {
      Hardware.distinct.mockResolvedValue(['Category1', 'Category2']);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getCategories(req, res);

      expect(Hardware.distinct).toHaveBeenCalledWith('category');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['Category1', 'Category2']);
    });

    it('should handle errors', async () => {
      Hardware.distinct.mockRejectedValue(new Error('Database error'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error to get Categories', error: expect.any(Error) });
    });
  });
});