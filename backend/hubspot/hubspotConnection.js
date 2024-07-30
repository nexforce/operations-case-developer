import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const hubspotPrivateApp = axios.create({
    baseURL: 'https://api.hubapi.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`
    }
})

export default hubspotPrivateApp;