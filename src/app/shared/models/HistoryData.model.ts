export interface HistoryData {
  get: string;
  parameters: {
    country: string;
    day: string;
  };
  errors: any[];
  results: number;
  response: HistoryDataResponse[];
}

export interface HistoryDataResponse {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    '1M_pop': string;
    total: number;
  };
  deaths: {
    new: string;
    '1M_pop': string;
    total: number;
  };
  tests: {
    '1M_pop': string;
    total: number;
    day: string;
    time: string;
  };
}
