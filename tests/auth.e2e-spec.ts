import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../src/modules/database.module';
import { DbManager } from '../src/database/dbManager';
import { getConnection } from 'typeorm';
import User from '../src/models/user.entity';
import { SilenceLogger } from '../src/database/loggers/silence.logger';
import request from 'supertest';
import { MaxDmitriev } from '../src/fixtures/users';
import { AuthModule } from '../src/modules/auth.module';
import { JwtService } from '@nestjs/jwt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dbManager = new DbManager(
      getConnection(),
      [User],
      new SilenceLogger(),
    );
    await dbManager.clear();
    await dbManager.seed();
  });

  describe('[POST] /api/auth/login', () => {
    it('should login with credentials', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          username: MaxDmitriev.username,
          password: MaxDmitriev.password,
        })
        .expect(HttpStatus.CREATED)
        .expect((res) => expect(res.body).toHaveProperty('access_token'));
    });

    it('should return error with wrong credentials', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ username: 'pizzaboy', password: 'pizzaboy' })
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((res) =>
          expect(res.body).toEqual(
            expect.objectContaining({
              message: 'Unauthorized',
              statusCode: HttpStatus.UNAUTHORIZED,
            }),
          ),
        );
    });
  });

  describe('[POST] /api/auth/me', () => {
    it('should access endpoint with jwt token', async () => {
      const jwtService = new JwtService({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '30m' },
      });

      const payload = {
        id: MaxDmitriev.id,
        username: MaxDmitriev.username,
      };
      const jwt = jwtService.sign(payload);

      await request(app.getHttpServer())
        .post('/api/auth/me')
        .auth(jwt, { type: 'bearer' })
        .expect(HttpStatus.OK)
        .expect({ user: { id: 'v3v845pxkwy2qsx1', username: 'itmax' } });
    });

    it('should show error when user is unauthorized', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/me')
        .expect(HttpStatus.UNAUTHORIZED)
        .expect((res) =>
          expect(res.body).toEqual(
            expect.objectContaining({
              message: 'Unauthorized',
              statusCode: HttpStatus.UNAUTHORIZED,
            }),
          ),
        );
    });
  });
});
