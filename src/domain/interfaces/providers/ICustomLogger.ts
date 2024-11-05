import { LoggerService } from '@nestjs/common';

export abstract class ICustomLogger implements LoggerService {
  abstract log(message: any): void;
  abstract error(message: any): void;
  abstract warn(message: any): void;
  abstract debug?(message: any): void;
  abstract fatal?(message: any): void;
}
