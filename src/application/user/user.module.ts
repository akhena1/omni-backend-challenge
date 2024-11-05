import { Module } from '@nestjs/common';
import CreateUserService from './createUser.service';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { UserController } from 'src/adapters/api/controllers/user/user.controller';
import { ProviderModule } from 'src/adapters/providers/providers.module';

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UsersModule {}
