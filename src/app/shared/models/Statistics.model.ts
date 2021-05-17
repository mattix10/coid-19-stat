export interface Statistics {
  country: string;
  cases: { new: number; total: string };
  deaths: { new: number; total: string };
  tests: number;
}
