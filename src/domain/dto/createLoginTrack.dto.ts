import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLoginTrackDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  ip: string;
}
