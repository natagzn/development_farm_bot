import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PublicKeyDto } from './dto/public-key.dto.js';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async loginOrRegister(data: PublicKeyDto) {
    const { telegramUser, publicKey } = data;

    if (!telegramUser?.id) {
      throw new Error('Telegram ID is required');
    }

    const telegramId = telegramUser.id.toString();

    let user = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      const userData: any = {
        telegramId,
        wallet: publicKey,
      };

      if (telegramUser.first_name) userData.firstName = telegramUser.first_name;
      if (telegramUser.last_name) userData.lastName = telegramUser.last_name;
      if (telegramUser.username) userData.username = telegramUser.username;
      if (telegramUser.photo_url) userData.photo_url = telegramUser.photo_url;

      user = await this.prisma.user.create({ data: userData });
    }

    const token = this.jwtService.sign({ userId: user.id });
    return { token };
  }
  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
