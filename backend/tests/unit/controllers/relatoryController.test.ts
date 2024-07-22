import request from 'supertest';
import express, { Application } from 'express';
import path from 'path';
import { callPythonScript } from '../../../src/controllers/relatoryController';

jest.mock('python-shell', () => {
  return {
    PythonShell: {
      run: jest.fn(() => {
        return {
          then: function (callback: any) {
            callback();
            return this;
          },
          catch: function (callback: any) {
            return this;
          }
        };
      }),
    },
  };
});

const app: Application = express();
app.get('/run-script', callPythonScript);

describe('Script Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call Python script and download CSV', async () => {
    jest.mock('python-shell', () => {
      return {
        PythonShell: {
          run: jest.fn(() => {
            return {
              then: function (callback: any) {
                return this;
              },
              catch: function (callback: any) {
                callback(new Error('Erro ao executar o script'));
                return this;
              }
            };
          }),
        },
      };
    });

    const response = await request(app).get('/run-script');

    expect(response.status).toBe(200);
  });

  test('should handle download error', async () => {
    jest.mock('python-shell', () => {
      return {
        PythonShell: {
          run: jest.fn(() => {
            return {
              then: function (callback: any) {
                callback();
                return this;
              },
              catch: function (callback: any) {
                return this;
              }
            };
          }),
        },
      };
    });

    jest.spyOn(path, 'join').mockReturnValueOnce('/path/to/nonexistent/inventory_report.csv');

    const response = await request(app).get('/run-script');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Erro ao gerar o relatório.');
  });
});
