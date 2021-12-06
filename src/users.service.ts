import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getUsers(): string {
    return JSON.stringify({ users: this.usersRepository.find() });
  }

  async getUser(userid: number) {
    return JSON.stringify({ user: await this.usersRepository.findOne(userid) });
  }

  async addUser(user: User) {
    const createdUser = await this.usersRepository.create(user);
    await this.usersRepository.save(createdUser);

    return JSON.stringify({ user: createdUser });
  }
}
