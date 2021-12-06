import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  fullname: string;
  age: number;
}

export const users: Array<User> = [
  {
    id: 1,
    fullname: 'Max Dmitriev',
    age: 21,
  },
  {
    id: 2,
    fullname: 'Ilia Mihof',
    age: 21,
  },
];

@Injectable()
export class UsersService {
  getUsers(): string {
    return JSON.stringify({ users });
  }

  getUser(userid: number): string {
    return JSON.stringify({ user: users[userid] });
  }
}
