import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { TelegramService } from './telegram.service.js';
=======
import { TelegramService } from './telegram.service';
>>>>>>> 43bc0fe14a23d5bca752b782407d8a1814c2e8a7

@Module({
  providers: [TelegramService],
})
export class TelegramModule {}
