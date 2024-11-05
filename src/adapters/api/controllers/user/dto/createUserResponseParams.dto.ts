import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserResponseDto {
  @ApiProperty({
    example: 'c33a3e93-14e1-43a7-bcec-eee15272357c',
  })
  @IsString()
  id: string;
}
