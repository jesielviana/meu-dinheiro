import { User } from '@prisma/client';
import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';

const usersRoute = Router();

const userController = new UserController();

usersRoute.get('/', async (req: Request, res: Response) => {
  const users = await userController.getAll();
  res.json(users);
});

usersRoute.post('/', async (req: Request, res: Response) => {
  const { name, email }: User = req.body;
  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Missing name or email' });
  }
  let userSaved = null;
  try {
    userSaved = await userController.save({ name, email });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }

  res.json(userSaved);
});

export default usersRoute;
