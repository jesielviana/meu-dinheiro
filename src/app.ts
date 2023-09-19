import express, {
  Request as ExRequest,
  Response as ExResponse,
  Express,
  urlencoded,
} from 'express';
import swaggerUi from 'swagger-ui-express';
//@ts-ignore
import { RegisterRoutes } from '../build/routes';
import { errorHanddling } from './middlewares/errorHandling';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app: Express = express();
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

RegisterRoutes(app);
app.use(errorHanddling());
app.use(notFoundHandler());

export default app;
