import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './adapters/database/entities/User';
import { LoginTrackerEntity } from './adapters/database/entities/LoginTracker';
import { TransferHistoryEntity } from './adapters/database/entities/TransferHistory';
import { ControllersModule } from './adapters/api/controllers/controllers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.18.0.1',
      port: 5432,
      database: 'omni',
      username: 'postgres',
      password: 'postgres',
      entities: [UserEntity, LoginTrackerEntity, TransferHistoryEntity],
      synchronize: true,
    }),
    ControllersModule,
  ],
})
export class AppModule {}
