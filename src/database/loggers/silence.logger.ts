import { LoggerInterface } from './logger.interface';

export class SilenceLogger implements LoggerInterface {
  log(message: string) {}
}
