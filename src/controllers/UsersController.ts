import { User } from '@prisma/client';
import { Body, Controller, Get, Post, Route, SuccessResponse } from 'tsoa';
import { UserDTO } from '../dto/UserDTO';
import UsersService from '../services/UsersService';

@Route('users')
export class UsersController extends Controller {
  @Get()
  public async getAll(): Promise<User[]> {
    return new UsersService().getAll();
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(@Body() requestBody: UserDTO): Promise<User> {
    try {
      this.setStatus(201); // set return status 201
      return new UsersService().save(requestBody);
    } catch (e) {
      console.log('errrr');
      this.setStatus(400);
      throw e;
    }
  }
}
