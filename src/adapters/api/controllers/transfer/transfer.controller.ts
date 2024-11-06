import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import TransferencyService from 'src/application/transfer/transferency.service';
import { ErrorMessages } from 'src/domain/constant/errorMessages';
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
  @ApiNotFoundResponse({
    description: ErrorMessages.USER_NOT_FOUND,
  })
  @ApiUnauthorizedResponse({
    description: ErrorMessages.USER_NOT_AUTHENTICATED,
  })
  @ApiForbiddenResponse({
    description: ErrorMessages.USER_NOT_AVAILABLE_TO_TRANSFER,
  })
  @ApiBadRequestResponse({
    description: ErrorMessages.AMOUNT_CANNOT_BE_ZERO,
  })
  @ApiUnprocessableEntityResponse({
    description: ErrorMessages.USER_INSUFFICIENT_FUNDS,
  })
  @ApiInternalServerErrorResponse()
  async transfer(@Body() bodyParams: TransferBodyParamsDto): Promise<unknown> {
    return await this.transferencyService.execute(bodyParams);
  }
}
