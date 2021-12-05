import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from './app.service';

@Controller('/api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/first-letter/:age')
  getFirstLetter(@Param('age') age: number, @Query('name') name: string): string {

    return `${this.appService.getUserFirstLetterOfTheName(name)} ${age}`;
  }
}
