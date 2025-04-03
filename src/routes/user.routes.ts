import { CUser } from '@/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', CUser.getAllUsers);
router.get('/find', CUser.getSpesificUsers);

export default router;
