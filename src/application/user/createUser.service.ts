import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserBodyParamsDto } from 'src/domain/dto/createUserBodyParams.dto';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { getAge } from '../../domain/utils/getAge';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';
import { IHashProvider } from 'src/domain/interfaces/providers/IHashProvider';
import { ErrorMessages } from 'src/domain/constant/errorMessages';
import { CreateUserResponseDto } from 'src/domain/dto/createUserResponseParams.dto';

@Injectable()
export default class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ICustomLogger,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(
    payload: CreateUserBodyParamsDto,
  ): Promise<CreateUserResponseDto> {
    try {
      this.logger.log('Executing Create User');

      const user = await this.userRepository.findOneByUsername(
        payload.username,
      );

      if (user) {
        this.logger.log(`user: ${payload.username} already exists`);
        throw new HttpException(
          ErrorMessages.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }

      const userAge = getAge(payload.birthdate);

      if (userAge < 18) {
        this.logger.log(`user: ${payload.username} doesn't have legal age`);
        throw new HttpException(
          ErrorMessages.USER_MUST_BE_LEGAL_AGE,
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await this.hashProvider.generateHash(
        payload.password,
      );

      const newUser = await this.userRepository.create({
        username: payload.username,
        birthDate: payload.birthdate,
        password: hashedPassword,
      });

      this.logger.log('User successfully created');

      return {
        id: newUser.userId,
      };
    } catch (error) {
      this.logger.error(`Internal error: ${error}`);
      throw error;
    }
  }
}
