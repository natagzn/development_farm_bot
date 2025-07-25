import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import AdminJS from 'adminjs'

import { PrismaService } from './prisma.service.js'
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import {TelegramModule} from './telegram/telegram.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';



AdminJS.registerAdapter({
  Database,
  Resource,
})

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const options = {
          connectionString: process.env.DATABASE_URL,
          database: process.env.DATABASE_NAME,
        };
        const prisma = new PrismaService()

        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [{
              resource: { model: getModelByName('User'), client: prisma },
              options: {},
            }],
          },
          auth: {
            authenticate: async (email, password) => {
              return { email}
            },
            cookiePassword: 'secret',
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }
      },
    }), TelegramModule, AuthModule, PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
