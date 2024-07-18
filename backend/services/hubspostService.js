const axios = require('axios');

const hubspotApiBaseUrl = process.env.HUBSPOT_API_BASE_URL;
const hubspotApiToken = process.env.HUBSPOT_API_TOKEN;

const hubspotApi = axios.create({
  baseURL: hubspotApiBaseUrl,
  headers: {
    Authorization: `Bearer ${hubspotApiToken}`,
    'Content-Type': 'application/json',
  },
});

const getContacts = async () => {
  try {
    const response = await hubspotApi.get('/crm/v3/objects/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts from HubSpot:', error);
    throw error;
  }
};

module.exports = {
  getContacts,
};