import { Router } from 'express';
import { userController } from '@src/controllers/user.controller';

const router = Router();

router.post('/register', userController.register);
export default router;
