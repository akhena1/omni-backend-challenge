import { Module } from '@nestjs/common';
import { UserController } from 'src/adapters/api/controllers/user/user.controller';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { ProviderModule } from 'src/adapters/providers/providers.module';
import CreateUserService from './createUser.service';
import ListUsersService from './listUsers.service';

@Module({
  imports: [DatabaseModule, ProviderModule],
  controllers: [UserController],
  providers: [CreateUserService, ListUsersService],
})
export class UsersModule {}
