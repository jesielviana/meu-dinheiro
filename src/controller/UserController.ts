import { PrismaClient, User } from '@prisma/client';
import { UserDTO } from '../dto/UserDTO';

class UserController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  public async save(user: UserDTO): Promise<User> {
    const userExists = await this.findByEmail(user.email);
    if (userExists) {
      throw new Error('User already exists');
    }
    const userSaved = await this.prisma.user.create({
      data: user,
    });
    return userSaved;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UserController;
