import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../src/modules/users.module';
import { DatabaseModule } from '../src/modules/database.module';
import { AppController } from '../src/controllers/app.controller';
import { AppService } from '../src/services/app.service';

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
