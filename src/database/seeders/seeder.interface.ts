export interface SeederInterface {
  seed: (entity: any, data: Array<object>) => void;
}