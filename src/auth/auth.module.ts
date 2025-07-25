import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET || 'super-secret',
    signOptions: { expiresIn: '7d' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
