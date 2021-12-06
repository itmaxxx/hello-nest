import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.usersService.getUsers();
  }

  @Get(':userid')
  getUser(@Param('userid') userid: number): string {
    return this.usersService.getUser(userid);
  }
}
