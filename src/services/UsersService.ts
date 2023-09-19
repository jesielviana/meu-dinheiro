import { PrismaClient, User } from '@prisma/client';
import { FieldErrors, ValidateError } from 'tsoa';
import { UserDTO } from '../dto/UserDTO';

class UsersService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async save(user: UserDTO): Promise<User> {
    const userExists = await this.findByEmail(user.email);
    if (userExists) {
      const fields: FieldErrors = {
        email: {
          message: 'Email already exists',
          value: user.email,
        },
      };
      throw new ValidateError(fields, 'User already exists');
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

export default UsersService;
