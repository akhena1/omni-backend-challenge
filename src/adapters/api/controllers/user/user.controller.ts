import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor() {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Criação de usuário',
  })
  async createUser(): Promise<unknown> {
    return 'ok';
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'Login de usuário',
  })
  async login(): Promise<unknown> {
    return 'ok';
  }

  @Get()
  @ApiOperation({
    summary: 'Listagem de usuários',
  })
  async list(): Promise<unknown> {
    return 'ok';
  }
}
