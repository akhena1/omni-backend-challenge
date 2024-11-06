import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/adapters/database/database.module';
import { ProviderModule } from 'src/adapters/providers/providers.module';
import SigninService from './signin.service';
import { AuthController } from 'src/adapters/api/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/adapters/guards/strategy/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    ProviderModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'chaveSuperSecreta',
      signOptions: { expiresIn: 2400 },
    }),
  ],
  controllers: [AuthController],
  providers: [SigninService, JwtStrategy],
})
export class SigninModule {}
