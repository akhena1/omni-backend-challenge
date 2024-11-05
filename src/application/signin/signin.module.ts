import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { ProviderModule } from 'src/adapters/providers/providers.module';
import SigninService from './signin.service';
import { AuthController } from 'src/adapters/api/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    ProviderModule,
    JwtModule.register({
      secret:
        'c4e4e78d527f1c2431ecf5cf4d5115e211aed2b6656120b9db52ab35065eee0247c576b6021a3ea3dada3eebb991c62cdaf07e9e5530374c76126a3dbbe9312727c0bcea0d8b952aacca0bd7d9ea4a66daec5956c31c4ff7dbc23a5f0d32cb592398213d84edb15a3a1051e94690d85e003e13093a80d2718e2b4de8125445112cb0b942c33d6339c08aadc0104d54330cdf738f1a36c339fcf9317c19707a449dfddbe4d56e224836ce06eca997e13008f204ec2a7b1008454f1ecd20302727167c50c44a9b7958b9ea99d76011336314684a89c651191d4a69d5db25cfa4be4a1e4cf50982e34417ca087fb7ff1170c0e34554fa58fe1e5de34de921f8b5eb', //add env var
      signOptions: { expiresIn: 200 },
    }),
  ],
  controllers: [AuthController],
  providers: [SigninService],
})
export class SigninModule {}
