import { Router } from 'express';
import { addUser, loginUser, updatUser, getUser} from '../controller/userController';
import {authenticateJWT} from '../middlewares/userMiddleware'

const router: Router = Router();

router.post('/signup', addUser);
router.post('/login', loginUser);
router.get('/profile/:id', authenticateJWT, getUser)
router.put('/update_profile/:id', authenticateJWT, updatUser);

export default router;
