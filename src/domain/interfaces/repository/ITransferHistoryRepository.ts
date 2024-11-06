import { TransferHistoryEntity } from 'src/adapters/database/entities/TransferHistory';

export abstract class ITransferHistoryRepository {
  abstract create(
    payload: Partial<TransferHistoryEntity>,
  ): Promise<TransferHistoryEntity | null>;
}
