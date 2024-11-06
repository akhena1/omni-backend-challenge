import { Module } from '@nestjs/common';
import { DatabaseModule } from './adapters/database/database.module';
import { UsersModule } from './application/user/user.module';
import { ProviderModule } from './adapters/providers/providers.module';
import { SigninModule } from './application/signin/signin.module';
import { TransferModule } from './application/transfer/transfer.module';

@Module({
  imports: [
    DatabaseModule,
    ProviderModule,
    UsersModule,
    SigninModule,
    TransferModule,
  ],
})
export class AppModule {}
