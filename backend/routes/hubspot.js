const express = require('express');
const router = express.Router();
const hubspotService = require('../services/hubspostService');

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await hubspotService.getContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).send('Error fetching contacts');
  }
});

module.exports = router;