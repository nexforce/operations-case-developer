import { Router } from 'express';
import { callPythonScript } from 'controllers/relatoryController';

const router = Router();

router.get('/', callPythonScript);

export default router;
