import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUserFirstLetterOfTheName(name: string): string {
    if (!name.length) {
      return '';
    }

    return name[0];
  }
}
