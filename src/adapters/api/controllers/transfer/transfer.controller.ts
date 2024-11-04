import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Transfers')
@Controller('transfer')
export class TransferController {
  constructor() {}

  @Post('')
  @ApiOperation({
    summary: 'Rota de transferência de dinheiro entre usuários',
  })
  async transfer(): Promise<unknown> {
    return 'ok';
  }
}
