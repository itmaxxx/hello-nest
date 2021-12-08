import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../src/users.module';
import { DatabaseModule } from '../src/database.module';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

describe('UsersController (e2e)', () => {

  let app: INestApplication;
  beforeEach(async () => {
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
