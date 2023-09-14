import { Request, Response, Router } from 'express';
import usersRoute from './users';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
  res.send('Ola!');
});

routers.use('/users', usersRoute);

export default routers;
