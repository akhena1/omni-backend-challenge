import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LoginResponseParamsDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNumber()
  expiresIn: number;
}
