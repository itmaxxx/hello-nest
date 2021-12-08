import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../models/user.entity';
import { CreateUserDto } from '../models/create-user.dto';
import uniqid from 'uniqid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<{ users: User[] }> {
    const users = await this.usersRepository.find();

    return { users };
  }

  async getUser(userid: number): Promise<{ user: User }> {
    const user = await this.usersRepository.findOne(userid);

    return { user };
  }

  async addUser(createUserDto: CreateUserDto): Promise<{ user: User }> {
    const createdUser = this.usersRepository.create({
      ...createUserDto,
      id: uniqid(),
    });
    await this.usersRepository.save(createdUser);

    return { user: createdUser };
  }
}
