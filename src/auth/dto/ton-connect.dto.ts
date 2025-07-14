import { IsString } from 'class-validator';

export class TonConnectDto {
  @IsString()
  address: string;
}
