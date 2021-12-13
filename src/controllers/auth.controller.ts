import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus, Res
} from "@nestjs/common";
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async checkAuth(@Request() req, @Res() res: Response) {
    return res.status(HttpStatus.OK).json({ user: req.user });
  }
}
