import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { getConnection } from 'typeorm';
import User from './models/user.entity';
import { DbManager } from "./database/dbManager";
import { ConsoleLogger } from "./database/loggers/console.logger";
import { Seeder } from "./database/seeders/seeder";
import { users } from "./fixtures/users";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, async () => {
    console.log('Server started on port 3000');

    const dbManager = new DbManager(getConnection(), [User], new ConsoleLogger('<DbManager> '));
    // As alternative to console log you can use silence logger
    // const dbManager = new DbManager(getConnection(), [User], new SilenceLogger());
    await dbManager.clear();

    const usersSeeder = new Seeder(getConnection(), new ConsoleLogger('<UsersSeeder> '));
    await usersSeeder.seed(User, users);
  });
}
bootstrap();
