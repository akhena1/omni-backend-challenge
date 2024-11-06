import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsString } from 'class-validator';

export class TransferBodyParamsDto {
  @ApiProperty()
  @IsString()
  toId: string;

  @ApiProperty()
  @IsString()
  fromId: string;

  @ApiProperty()
  @IsDecimal()
  amount: number;
}
