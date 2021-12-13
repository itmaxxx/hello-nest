import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Response } from 'express';
import { CreateUserDto } from '../models/create-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    try {
      const users = await this.usersService.getUsers();

      return res.status(HttpStatus.OK).json({ users });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to get users',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.createUser(createUserDto);

      return res.status(HttpStatus.CREATED).json({ user: createdUser });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Failed to create user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':userid')
  async getUser(@Res() res: Response, @Param('userid') userid: string) {
    try {
      const user = await this.usersService.findUserById(userid);

      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      return res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      throw new HttpException('Failed to get user', HttpStatus.NOT_FOUND);
    }
  }
}
