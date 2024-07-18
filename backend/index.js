require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const hubspotRouter = require('./routes/hubspot');

app.use('/', indexRouter);
app.use('/api/hubspot', hubspotRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});