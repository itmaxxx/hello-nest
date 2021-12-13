import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersModule } from './users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UsersService } from '../services/users.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
