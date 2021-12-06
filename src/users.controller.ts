import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './user.entity';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.usersService.getUsers();
  }

  @Get(':userid')
  async getUser(@Param('userid') userid: number): Promise<string> {
    return await this.usersService.getUser(userid);
  }

  @Get('/crate')
  // @Post()
  async createUser(): Promise<string> {
    try {
      const result = await this.usersService.addUser({
        fullname: 'Max Dmitriev',
        age: 21,
      });

      return result;
    } catch (err) {
      console.log(err);

      return JSON.stringify({ error: 'Failed to create user' });
    }
  }
}
