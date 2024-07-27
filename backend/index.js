import express from 'express';
import router from './routes/routes.js';
import connectDB from './connectDB/connectDB.js';

const app = express();
const port = 3000;

//connection to database
connectDB();

app.use(express.json());
app.use('/hardware/', router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})