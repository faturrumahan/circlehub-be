import { CUser } from '@/controllers';
import { Router } from 'express';

const router = Router();

router.get('/', CUser.getAllUsers);
router.get('/:id', CUser.getSpesificUsers);
router.get('/:name', CUser.getSpesificUsers);
router.get('/:role', CUser.getSpesificUsers);

export default router;
