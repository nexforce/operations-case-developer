import { Request, Response } from 'express';
import { PythonShell } from 'python-shell';
import path from 'path';

export const callPythonScript = (_req: Request, res: Response) => {
  try {
    const options = {
      scriptPath: path.join(__dirname, '../scripts/'),
    };

    PythonShell.run('analysis.py', options).then(() => {
      const csvFilePath = path.join(options.scriptPath, 'inventory_report.csv');

      res.download(csvFilePath, 'inventory_report.csv', (err) => {
        if (err) {
          res.status(500).send('Error while generating CSV file.');
        }
      });
    });
  } catch (err) {
    res.status(500).send('Error running the script.');
  }
};
