export interface BarChart {
  [position: number]: Array<Array<any> | string | number>;
  push(item): number;
}
