export interface CoreChart {
  [position: number]: Array<string | number>;
  push(item): number;
}
