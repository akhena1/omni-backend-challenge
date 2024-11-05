import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import SigninService from 'src/application/signin/signin.service';
import { LoginBodyParamsDto } from '../../../../domain/dto/loginBodyParams.dto';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('users')
export class AuthController {
  constructor(private readonly signinService: SigninService) {}
  @Post('/signin')
  @ApiOperation({
    summary: 'Login de usuário',
  })
  async login(
    @Body() bodyParams: LoginBodyParamsDto,
    @Req() request: Request,
  ): Promise<unknown> {
    return await this.signinService.execute(bodyParams, request.ip);
  }
}
