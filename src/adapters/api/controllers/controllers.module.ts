import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TransferController } from './transfer/transfer.controller';

@Module({
  controllers: [UserController, TransferController],
})
export class ControllersModule {}
