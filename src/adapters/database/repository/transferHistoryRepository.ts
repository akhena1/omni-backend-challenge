import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITransferHistoryRepository } from 'src/domain/interfaces/repository/ITransferHistoryRepository';
import { TransferHistoryEntity } from '../entities/TransferHistory';
import { TransferBodyParamsDto } from 'src/domain/dto/transferBodyParams.dto';

export default class TransferHistoryRepository
  implements ITransferHistoryRepository
{
  constructor(
    @InjectRepository(TransferHistoryEntity)
    private readonly transferHistoryRepository: Repository<TransferHistoryEntity>,
  ) {}

  async create(
    payload: TransferBodyParamsDto,
  ): Promise<TransferHistoryEntity | null> {
    return this.transferHistoryRepository.save(payload);
  }
}
