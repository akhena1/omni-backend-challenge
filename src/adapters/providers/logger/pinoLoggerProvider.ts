import { Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';
import { ICustomLogger } from 'src/domain/interfaces/providers/ICustomLogger';

@Injectable()
export class PinoLoggerProvider implements ICustomLogger {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({});
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any) {
    this.logger.error(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug?(message: any) {
    this.logger.debug(message);
  }

  fatal?(message: any) {
    this.logger.fatal(message);
  }
}
