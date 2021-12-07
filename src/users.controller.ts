import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './create-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.usersService.getUsers();

      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to get users',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/create')
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.addUser(createUserDto);

      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':userid')
  async getUser(@Res() res: Response, @Param('userid') userid: number) {
    try {
      const user = await this.usersService.getUser(userid);

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to get user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
