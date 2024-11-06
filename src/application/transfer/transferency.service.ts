import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';
import { ErrorMessages } from 'src/domain/constant/errorMessages';
import { TransferBodyParamsDto } from 'src/domain/dto/transferBodyParams.dto';
import { ITransferHistoryRepository } from 'src/domain/interfaces/repository/ITransferHistoryRepository';

@Injectable()
export default class TransferencyService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transferHistoryRepository: ITransferHistoryRepository,
    private readonly logger: ICustomLogger,
  ) {}

  async execute(payload: TransferBodyParamsDto): Promise<any> {
    try {
      this.logger.log(
        `Executing transferency from: ${payload.fromId} to: ${payload.toId}`,
      );

      const receiver = await this.userRepository.findOneById(payload.toId);
      const sender = await this.userRepository.findOneById(payload.fromId);

      if (!receiver || !sender) {
        this.logger.error(`Receiver or sender does not exists`);
        throw new HttpException(
          ErrorMessages.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      if (payload.amount < 0) {
        this.logger.error(`Amount cannot be zero`);
        throw new HttpException(
          ErrorMessages.AMOUNT_CANNOT_BE_ZERO,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (sender.balance < payload.amount) {
        this.logger.log(`Insufficient funds`);
        throw new HttpException(
          ErrorMessages.USER_INSUFFICIENT_FUNDS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const transferencyData = {
        receiverId: payload.toId,
        senderId: payload.fromId,
        amount: Number(payload.amount),
      };

      await this.userRepository.setBalance(transferencyData);

      await this.transferHistoryRepository.create(transferencyData);

      this.logger.log('transfer completed with success');
    } catch (error) {
      this.logger.error(`Internal error at transferency: ${error}`);
      throw error;
    }
  }
}
