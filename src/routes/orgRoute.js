import { Router } from 'express';
import orgController from '../controllers/orgController';

const router = new Router();

router.get('/', orgController.FindAllAsync);
router.get('/search', orgController.SearchAsync);

router.put('/update',orgController.UpdateAsync);

router.post('/', orgController.AddAsync);

router.delete('/delete',orgController.DeleteAsync)

export default router;
