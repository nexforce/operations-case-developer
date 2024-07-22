import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/config/database';

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /health', () => {
  it('should return server status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is online!');
  });
});
