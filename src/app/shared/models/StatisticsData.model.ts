export interface StatisticsData {
  get: string;
  parameters: [];
  results: number;
  response: Array<StatisticsDataResponse>;
}

export interface StatisticsDataResponse {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: string;
    active: number;
    critical: number;
    '1M_pop': string;
    total: number;
  };
  deaths: {
    new: string;
    '1M_pop': string;
    total: number;
    tests: {
      '1M_pop': string;
      total: number;
      day: string;
      time: string;
    };
  };
}
