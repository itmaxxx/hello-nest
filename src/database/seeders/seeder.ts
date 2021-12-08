import { Connection } from 'typeorm';
import { LoggerInterface } from '../loggers/logger.interface';
import { SeederInterface } from "./seeder.interface";

export class Seeder implements SeederInterface {
  constructor(
    private connection: Connection,
    private logger: LoggerInterface,
  ) {}

  async seed(entity: any, data: Array<object>) {
    this.logger.log(`seeding ${entity.name}`);

    await this.connection
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(data)
      .execute();

    this.logger.log(`seeded ${entity.name}`);
  }
}
