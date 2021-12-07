import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<string> {
    try {
      const users = await this.usersService.getUsers();

      return JSON.stringify(users);
    } catch (error) {
      return JSON.stringify({ error: 'Failed to get users' });
    }
  }

  @Get('/create')
  async createUser(): Promise<string> {
    try {
      const result = await this.usersService.addUser({
        fullname: 'Max Dmitriev',
        age: 21,
      });

      return JSON.stringify(result);
    } catch (error) {
      return JSON.stringify({ error: 'Failed to create user' });
    }
  }

  @Get(':userid')
  async getUser(@Param('userid') userid: number): Promise<string> {
    try {
      const user = await this.usersService.getUser(userid);

      return JSON.stringify(user);
    } catch (error) {
      return JSON.stringify({ error: 'Failed to get user by id' });
    }
  }
}
