import { Module } from '@nestjs/common';
import { DatabaseModule } from './adapters/database/database.module';
import { UsersModule } from './application/user/user.module';
import { ProviderModule } from './adapters/providers/providers.module';

@Module({
  imports: [DatabaseModule, ProviderModule, UsersModule],
})
export class AppModule {}
