import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "../models/user.entity";
import { CreateUserDto } from "../models/create-user.dto";
import uniqid from "uniqid";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ username });
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findUserById(userid: string): Promise<User | undefined> {
    return await this.usersRepository.findOne(userid);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create({
      ...createUserDto,
      id: uniqid(),
    });
    await this.usersRepository.save(createdUser);

    return createdUser;
  }
}
