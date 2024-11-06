import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { ProviderModule } from 'src/adapters/providers/providers.module';
import { TransferController } from 'src/adapters/api/controllers/transfer/transfer.controller';
import TransferencyService from './transferency.service';

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [TransferController],
  providers: [TransferencyService],
})
export class TransferModule {}
