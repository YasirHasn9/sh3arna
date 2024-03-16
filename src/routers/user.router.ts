import { Router } from 'express';
import { userController } from '@src/controllers/user.controller';
import { userValidation } from '@src/middlewares/user.middleware';

const router = Router();

router.post(
  '/register',
  userValidation.validateUserInputs,
  userController.register,
);
router.get('/', userController.getUsers);

export default router;
