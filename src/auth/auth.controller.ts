import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PublicKeyDto } from './dto/public-key.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('ton-connect')
  async loginOrRegister(@Body() dto: PublicKeyDto) {
    console.log(dto);
    return this.authService.loginOrRegister(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user.userId;
    const user = await this.authService.getUserById(userId);

    if (!user) {
      return { message: 'User not found' };
    }

    return {
      message: 'Success!',
      user,
    };
  }
}
