import express from 'express';
import router from './routes/routes.js';
import connectDB from './connectDB/connectDB.js';
import cors from 'cors';

const app = express();
const port = 3000;

//connection to database
connectDB();

app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json());
app.use('/hardware/', router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})