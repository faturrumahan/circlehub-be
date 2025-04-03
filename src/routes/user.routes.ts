import { CUser } from '@/controllers';
import { authMiddleware } from '@/middlewares';
import { Router } from 'express';

const router = Router();

router.get('/', CUser.getAllUsers);
router.get('/find', CUser.getSpesificUsers);
router.patch('/edit', authMiddleware, CUser.editUser);
router.post('/verify/password', CUser.verifyUserPassword);

export default router;
