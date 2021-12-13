import {
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  Res,
  Body,
  Req,
  HttpException,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../models/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.generateJwt(req.user);
  }

  @Post('register')
  async register(@Req() req, @Res() res, @Body() user: CreateUserDto) {
    try {
      const userWithSameUsername = await this.usersService.findByUsername(
        user.username,
      );

      if (userWithSameUsername) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Username already taken',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await this.authService.registerUserAndGenerateJwt(user);

      console.log({ result });

      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      console.log({ error: error.message });

      throw new HttpException(
        {
          error: 'Failed to register',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async checkAuth(@Req() req, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ user: req.user });
  }
}
