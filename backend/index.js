import express from 'express';
import router from './routes/routes.js';
import connectDB from './connectDB/connectDB.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const scriptPath = join(__dirname, '../scripts/script_data.py');

//connection to database
connectDB();

app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json());
app.use('/hardware/', router);

app.get('/run-py-script/', (req, res) => {
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  res.send('Script executado com sucesso!');
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})