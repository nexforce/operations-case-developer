import { Router } from 'express';
import * as inventoryController from 'controllers/inventoryController';

const router = Router();

router.get('/', inventoryController.getItems);
router.get('/:id', inventoryController.getItem);
router.post('/', inventoryController.createItem);
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

export default router;
