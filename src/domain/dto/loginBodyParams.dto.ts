import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginBodyParamsDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
