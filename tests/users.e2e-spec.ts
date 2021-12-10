import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersModule } from '../src/modules/users.module';
import { DatabaseModule } from '../src/modules/database.module';
import { MaxDmitriev, users } from '../src/fixtures/users';
import { CreateUserDto } from '../src/models/create-user.dto';
import { DbManager } from '../src/database/dbManager';
import { getConnection } from 'typeorm';
import User from '../src/models/user.entity';
import { SilenceLogger } from '../src/database/loggers/silence.logger';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        stopAtFirstError: true,
      }),
    );
    await app.init();

    const dbManager = new DbManager(
      getConnection(),
      [User],
      new SilenceLogger(),
    );
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
        username: 'offiza',
        age: 20,
        password: 'pizza',
      };

      await request(app.getHttpServer())
        .post('/api/users')
        .send(userToCreate)
        .expect(HttpStatus.CREATED)
        .expect((res) =>
          expect(res.body.user).toEqual(expect.objectContaining(userToCreate)),
        );
    });

    it('should return validation errors when fields missing or not set', async () => {
      const userToCreate = {
        fullname: 12,
        age: '20a',
        password: 'pizza',
      };

      await request(app.getHttpServer())
        .post('/api/users')
        .send(userToCreate)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body).toEqual({
            error: 'Bad Request',
            message: [
              'fullname must be longer than or equal to 3 characters',
              'username must be longer than or equal to 3 characters',
              'age must be a number conforming to the specified constraints',
            ],
            statusCode: 400,
          });
        });
    });
  });
});
