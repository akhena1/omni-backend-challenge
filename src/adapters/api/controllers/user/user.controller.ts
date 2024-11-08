import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserBodyParamsDto } from '../../../../domain/dto/createUserBodyParams.dto';
import CreateUserService from 'src/application/user/createUser.service';
import { CreateUserResponseDto } from '../../../../domain/dto/createUserResponseParams.dto';
import { ErrorMessages } from 'src/domain/constant/errorMessages';
import ListUserService from 'src/application/user/listUsers.service';
import { ListUserResponseParamsDto } from 'src/domain/dto/listUsersResponseParams.dto';
import { JwtAuthGuard } from 'src/adapters/guards/guard/jwt.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUserService: ListUserService,
  ) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Criação de usuário',
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: CreateUserResponseDto,
  })
  @ApiConflictResponse({
    description: ErrorMessages.USER_ALREADY_EXISTS,
  })
  @ApiBadRequestResponse({
    description: ErrorMessages.USER_MUST_BE_LEGAL_AGE,
  })
  @ApiBadRequestResponse({
    description: ErrorMessages.ZOD_VALIDATION_ERROR,
  })
  @ApiInternalServerErrorResponse({
    description: ErrorMessages.INTERNAL_SERVER_ERROR,
  })
  async createUser(
    @Body() bodyParams: CreateUserBodyParamsDto,
  ): Promise<unknown> {
    return await this.createUserService.execute(bodyParams);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listagem de usuários',
  })
  @ApiOkResponse({
    type: ListUserResponseParamsDto,
  })
  @ApiUnauthorizedResponse({
    description: ErrorMessages.USER_NOT_AUTHENTICATED,
  })
  async list(): Promise<unknown> {
    return await this.listUserService.execute();
  }
}
