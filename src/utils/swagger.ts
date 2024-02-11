// this is going to be the about swagger files creation

// 1. create swagger spec by using the swagger jsonDoc and pass the options
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import config from 'config';
import Logging from './logging';

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sh3aran Swagger documentation',
      version: version,
    },
    servers: [
      {
        url: `http://localhost:${config.get('port')}`,
      },
    ],
  },
  apis: ['./src/routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

export default function swaggerDocs(app: Express, port: number): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  Logging.log(`swagger docs are available at http://localhost:${port}/docs`);
}
