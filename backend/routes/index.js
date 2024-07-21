const express = require('express');
const router = express.Router();
const cors = require('cors');

router.get('/',cors(), (req, res) => {
  res.send('Hello from the main router!');
});

module.exports = router;