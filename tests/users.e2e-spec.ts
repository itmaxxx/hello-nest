import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../src/users.module';
import { DatabaseModule } from '../src/database.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.POSTGRES_HOST = 'localhost';
    process.env.POSTGRES_PORT = '5432';
    process.env.POSTGRES_USER = 'admin';
    process.env.POSTGRES_PASSWORD = 'admin';
    process.env.POSTGRES_DB = 'nestjs';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/users');

    expect(response.body).toEqual({});
  });
});
