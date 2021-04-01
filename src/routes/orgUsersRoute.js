import { Router } from 'express';
import orgUsers from '../controllers/orgUsersController';

const router = new Router();

router.get('/', orgUsers.index);

router.post('/', orgUsers.createNewUserAsync);

router.get('/search', orgUsers.findOrgUsersAsync);

router.delete('/delete', orgUsers.deleteOneUserByIdAsync)

export default router;