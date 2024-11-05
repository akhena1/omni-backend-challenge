import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserBodyParamsDto } from './dto/createUserBodyParams.dto';
import CreateUserService from 'src/application/user/createUser.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Criação de usuário',
  })
  async createUser(
    @Body() bodyParams: CreateUserBodyParamsDto,
  ): Promise<unknown> {
    return await this.createUserService.execute(bodyParams);
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
