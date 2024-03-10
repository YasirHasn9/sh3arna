import { Express } from 'express';
import userRouter from '@src/routers/user.router';

export function routes(app: Express): void {
  /**
   * @openapi
   * /healthCheck:
   *  get:
   *     tags:
   *     - healthCheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   value: "string"
   *                 environment:
   *                   value: "string"
   */
  app.get('/healthCheck', (_req, res) => {
    res.status(200).json({
      message: 'Ok',
      environment: process.env.NODE_ENV,
    });
  });

  app.use('/api/users', userRouter);
}
