import { IsString, IsObject } from 'class-validator';

export class PublicKeyDto {
  @IsString()
  publicKey: string;

  @IsObject()
  telegramUser: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  };
}
