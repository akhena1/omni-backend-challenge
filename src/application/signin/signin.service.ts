import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';
import { LoginBodyParamsDto } from 'src/domain/dto/loginBodyParams.dto';
import { ErrorMessages } from 'src/domain/constant/errorMessages';
import { IHashProvider } from 'src/domain/interfaces/providers/IHashProvider';
import { JwtService } from '@nestjs/jwt';
import { ILoginTrackerRepository } from 'src/domain/interfaces/repository/ILoginTrackerRepository';

@Injectable()
export default class SigninService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly loginTrackerRepository: ILoginTrackerRepository,
    private readonly logger: ICustomLogger,
    private readonly hashProvider: IHashProvider,
    private readonly jwtService: JwtService,
  ) {}

  async execute(payload: LoginBodyParamsDto, ip: string): Promise<any> {
    try {
      this.logger.log(`Loggin User: ${payload.username} at IP Address: ${ip}`);

      const user = await this.userRepository.findOneByUsername(
        payload.username,
      );

      if (!user) {
        this.logger.error('User not founded');
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      const isPasswordValid = await this.hashProvider.compareHash(
        payload.password,
        user.password,
      );

      if (!isPasswordValid) {
        this.logger.error('Invalid Pass');
        throw new HttpException(
          ErrorMessages.USER_INVALID_PASSWORD,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = this.jwtService.sign({
        id: user.userId,
        username: user.username,
      });

      this.logger.log(
        `Successfully login for user: ${payload.username} at ipAddress: ${ip}`,
      );

      await this.loginTrackerRepository.create({
        userId: user.userId,
        ip,
      });

      return {
        token,
        expiresIn: '200', // add env vars
      };
    } catch (error) {
      this.logger.error(`Internal error: ${error}`);
      throw error;
    }
  }
}
