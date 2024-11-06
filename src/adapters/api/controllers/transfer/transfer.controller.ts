import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import TransferencyService from 'src/application/transfer/transferency.service';
import { TransferBodyParamsDto } from 'src/domain/dto/transferBodyParams.dto';

@ApiTags('Transfers')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferencyService: TransferencyService) {}

  @Post('')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Rota de transferência de dinheiro entre usuários',
  })
  async transfer(@Body() bodyParams: TransferBodyParamsDto): Promise<unknown> {
    return await this.transferencyService.execute(bodyParams);
  }
}
