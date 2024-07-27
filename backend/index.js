import express from 'express';
import router from './routes/routes';

const express = require('express');
const app = express();
const port = 3000;

app.get('/', router);
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})