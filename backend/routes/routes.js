import express from 'express';
import { getItems, postItem, updateItem, deleteItem } from '../controllers/hardwareController.js';
const router = express.Router();

router.get('/', getItems);
router.post('/create-object/', postItem);
router.patch('/update-object/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;