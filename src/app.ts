import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import config from 'config';
import Logging from './utils/logging';
import { connect } from '@src/utils/connect';
import { routes } from './routes';
import swaggerDocs from '@src/utils/swagger';

const port: number = config.get('port');
const app = express();

// Parsing json and only looks at requests
//where the Content-Type header matches the the type option.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors?
// 1. security features to restrict web pages from making requests to a different domain. The same origin policy.
// 2. allows to specify which domains can access recourses on your server.
app.use(
  cors({
    // allows for the browser to accept requests that includes credentials like cookies,
    // and authorization headers.
    // by default, browsers do not include credentials in cross-origin requests.
    credentials: true,
  }),
);

app.listen(port, async () => {
  Logging.log(`Server is running on port http://localhost:${port}/`);
  await connect();
  routes(app);
  swaggerDocs(app, port);
});
