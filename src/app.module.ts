import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './adapters/database/entities/Person';
import { LoginTrackerEntity } from './adapters/database/entities/LoginTracker';
import { TransferHistoryEntity } from './adapters/database/entities/TransferHistory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.18.0.1',
      port: 5432,
      database: 'omni',
      username: 'postgres',
      password: 'postgres',
      entities: [PersonEntity, LoginTrackerEntity, TransferHistoryEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
