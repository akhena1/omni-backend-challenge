import { Global, Module } from '@nestjs/common';
import { IHashProvider } from 'src/domain/interfaces/providers/IHashProvider';
import BCryptHashProvider from './hash/bcryptHashProvider';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';
import { PinoLoggerProvider } from './logger/pinoLoggerProvider';

@Global()
@Module({
  providers: [
    {
      provide: IHashProvider,
      useClass: BCryptHashProvider,
    },
    {
      provide: ICustomLogger,
      useClass: PinoLoggerProvider,
    },
  ],
  exports: [IHashProvider, ICustomLogger],
})
export class ProviderModule {}
