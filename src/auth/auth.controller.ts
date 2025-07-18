import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicKeyDto } from './dto/public-key.dto';
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
  getMe(@Req() req: any) {
    console.log("userId:", req.user);
    return { message: 'Success!', userId: req.user.userId };
  }
}
