import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const ngrok = process.env.NGROK;

    if (!token) {
      throw new Error(
        'TELEGRAM_BOT_TOKEN is not defined in environment variables!',
      );
    }
    if (!ngrok) {
      throw new Error('ngrok is not defined in environment variables!');
    }

    this.bot = new Telegraf(token);

    this.bot.start((ctx) => {
      ctx.reply('Натисни кнопку нижче, щоб відкрити WebApp 👇', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Відкрити WebApp :)',
                web_app: {
                  url: ngrok,
                },
              },
            ],
          ],
          resize_keyboard: true,
        },
      });
    });

    this.bot.launch();
  }
}
