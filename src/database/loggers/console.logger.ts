import { LoggerInterface } from "./logger.interface";

export class ConsoleLogger implements LoggerInterface {
  constructor(private prefix: string) {
  }

  log (message: string) {
    console.log(this.prefix + message);
  }
}