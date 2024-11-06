import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';
import { ListUserResponseParamsDto } from 'src/domain/dto/listUsersResponseParams.dto';

@Injectable()
export default class ListUsersService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ICustomLogger,
  ) {}

  async execute(): Promise<ListUserResponseParamsDto[]> {
    try {
      this.logger.log('Executing List User');

      return await this.userRepository.findAll();
    } catch (error) {
      this.logger.error(`Internal error: ${error}`);
      throw error;
    }
  }
}
