export interface CountryInfo {
  day: string;
  country: string;
  cases: {
    new: number | string;
    total: number | string;
  };
  deaths: {
    new: number | string;
    total: number | string;
  };
  tests: {
    total: number | string;
  };
}
