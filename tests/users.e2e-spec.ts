import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../src/modules/users.module';
import { DatabaseModule } from '../src/modules/database.module';
import { AppController } from '../src/controllers/app.controller';
import { AppService } from '../src/services/app.service';
import { MaxDmitriev, users } from '../src/fixtures/users';
import { CreateUserDto } from '../src/models/create-user.dto';
import { DbManager } from "../src/database/dbManager";
import { getConnection } from "typeorm";
import User from "../src/models/user.entity";
import { SilenceLogger } from "../src/database/loggers/silence.logger";

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

    const dbManager = new DbManager(getConnection(), [User], new SilenceLogger());
    await dbManager.clear();
    await dbManager.seed();
  });

  describe('[GET] /api/users', () => {
    it('should get users list', async () => {
      await request(app.getHttpServer())
        .get('/api/users')
        .expect(HttpStatus.OK)
        .expect({ users });
    });
  });

  describe('[GET] /api/users/:userid', () => {
    it('should get user by id', async () => {
      await request(app.getHttpServer())
        .get('/api/users/' + MaxDmitriev.id)
        .expect(HttpStatus.OK)
        .expect({ user: MaxDmitriev });
    });

    it('should return error when trying to get not existing user', async () => {
      await request(app.getHttpServer())
        .get('/api/users/notexistingid')
        .expect(HttpStatus.NOT_FOUND)
        .expect({
          message: 'User not found',
          statusCode: HttpStatus.NOT_FOUND,
        });
    });
  });

  describe('[POST] /api/users', () => {
    it('should create new user', async () => {
      const userToCreate: CreateUserDto = {
        fullname: 'Matvey Gorelik',
        age: 20,
      };

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send(userToCreate)
        .expect(HttpStatus.CREATED);

      expect(response.body.user).toEqual(expect.objectContaining(userToCreate));
    });
  });
});
