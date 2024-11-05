import { Global, Module } from '@nestjs/common';
import UserRepository from './repository/userRepository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/User';
import { LoginTrackerEntity } from './entities/LoginTracker';
import { TransferHistoryEntity } from './entities/TransferHistory';
import { IUserRepository } from 'src/domain/interfaces/repository/IUserRepository';
import { ILoginTrackerRepository } from 'src/domain/interfaces/repository/ILoginTrackerRepository';
import LoginTrackerRepository from './repository/loginTrackerRepository';

@Global()
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
    TypeOrmModule.forFeature([
      UserEntity,
      LoginTrackerEntity,
      TransferHistoryEntity,
    ]),
  ],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ILoginTrackerRepository,
      useClass: LoginTrackerRepository,
    },
  ],
  exports: [IUserRepository, ILoginTrackerRepository],
})
export class DatabaseModule {}
