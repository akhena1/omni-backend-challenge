import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import SigninService from 'src/application/signin/signin.service';
import { LoginBodyParamsDto } from '../../../../domain/dto/loginBodyParams.dto';
import { Request } from 'express';
import { LoginResponseParamsDto } from 'src/domain/dto/loginResponseParams.dto';
import { ErrorMessages } from 'src/domain/constant/errorMessages';

@ApiTags('Auth')
@Controller('users')
export class AuthController {
  constructor(private readonly signinService: SigninService) {}
  @Post('/signin')
  @ApiOperation({
    summary: 'Login de usuário',
  })
  @ApiCreatedResponse({
    description: 'Login efetuado com sucesso',
    type: LoginResponseParamsDto,
  })
  @ApiNotFoundResponse({
    description: ErrorMessages.USER_NOT_FOUND,
  })
  @ApiUnauthorizedResponse({
    description: ErrorMessages.USER_INVALID_PASSWORD,
  })
  @ApiInternalServerErrorResponse()
  async login(
    @Body() bodyParams: LoginBodyParamsDto,
    @Req() request: Request,
  ): Promise<unknown> {
    return await this.signinService.execute(bodyParams, request.ip);
  }
}
