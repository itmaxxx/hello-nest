import { Connection } from 'typeorm';
import { Seeder } from './seeders/seeder';
import User from '../models/user.entity';
import { users } from '../fixtures/users';

export class DbManager {
  constructor(
    private connection: Connection,
    private entities: Array<any>,
    private logger: { log: (message: string) => void },
  ) {}

  async clear() {
    for (let i = 0; i < this.entities.length; i++) {
      this.logger.log(`delete ${this.entities[i].name}`);

      await this.connection
        .createQueryBuilder()
        .delete()
        .from(this.entities[i])
        .execute();

      this.logger.log(`deleted ${this.entities[i].name}`);
    }
  }

  async seed() {
    const usersSeeder = new Seeder(this.connection, this.logger);
    await usersSeeder.seed(User, users);
  }
}
