import express, { Express } from 'express';
import routers from './routes';

const app: Express = express();

app.use(express.json());

app.use('/', routers);

export default app;
