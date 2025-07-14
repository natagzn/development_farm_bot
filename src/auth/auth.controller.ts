import { Body, Controller, Post, Get } from '@nestjs/common';
import { TonConnectDto } from './dto/ton-connect.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ton')
  async ton() {
    return 'hello worlg';
  }

  @Post('ton-connect')
  async tonConnect(@Body() dto: TonConnectDto) {
      console.log('dto:', dto); // DEBUG
    return this.authService.tonLoginOrRegister(dto.address);
  }
}
