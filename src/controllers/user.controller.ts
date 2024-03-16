import { Request, Response } from 'express';
import { userService } from '@src/services/user.service';
import Logger from '@src/utils/logging';
import { ErrorCodes } from '@src/errorCodes';

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *     - User
 *     summary: Register a new user
 *     description: Allows for the registration of a new user by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 required: true
 *                 format: email
 *                 example: johndoe@example.com
 *               firstName:
 *                 type: string
 *                 required: false
 *                 example: John
 *               lastName:
 *                 type: string
 *                 required: false
 *                 example: Doe
 *               password:
 *                 type: string
 *                 required: true
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60af924411b8afeb6a3151a5
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *       400:
 *         description: Bad request, validation errors
 *       500:
 *         description: Internal server error
 */
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = req;
    const user = await userService.create(body);
    res.status(201).json(user).end();
  } catch (err: unknown) {
    if (err instanceof Error && err.message === ErrorCodes.UserAlreadyExists) {
      res.status(409).json({ errorMessage: 'User is already existed' });
    }
    Logger.error(`[Controller]: register
                  [Error]: ${err}`);
    res.status(500).json({ errorMessage: 'Internal server error' });
  }
};

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      Logger.error(err.message);
      res.status(400).json({ errorMessage: err.message });
    }
    Logger.error(`[Controller]: getUsers
                  [Error]: ${err}`);
    res.status(500).json({ errorMessage: 'Internal server error' });
  }
};
export const userController = {
  register,
  getUsers,
};
