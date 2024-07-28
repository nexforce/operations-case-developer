import express from 'express';
import { getItems, postItem, updateItem, deleteItem, getCategories } from '../controllers/hardwareController.js';
const router = express.Router();

router.get('/', getItems);
router.post('/create-object/', postItem);
router.patch('/update-object/:id', updateItem);
router.delete('/:id', deleteItem);
router.get('/all-categories/', getCategories);

export default router;