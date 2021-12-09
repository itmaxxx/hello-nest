import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from "@nestjs/jwt";
import User from "../models/user.entity";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
