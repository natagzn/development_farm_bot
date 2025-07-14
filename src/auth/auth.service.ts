import { Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
//import { PrismaService } from '../prisma/prisma.service'; // якщо ти використовуєш Prisma

@Injectable()
export class AuthService {
  constructor(
    //private readonly prisma: PrismaService,
    //private readonly jwt: JwtService
  ) {}

  async tonLoginOrRegister(address: string) {
    /*let user = await this.prisma.user.findUnique({
      where: { walletAddress: address }
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          walletAddress: address
        }
      });
    }

    const token = this.jwt.sign({ userId: user.id });*/
    //return { token };
    console.log('Helo World!')
    return address;
  }
}
