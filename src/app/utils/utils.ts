// this function is necessary because MaterialTable requires specific format data (number) to sort items

import { CountryInfo } from '../shared/models/CountryInfo.model';

export function destructItem(item): CountryInfo {
  const newItem = (({
    day,
    country,
    cases: { new: nCases, total: tCases },
    deaths: { new: nDeaths, total: tDeaths },
    tests: { total: tTest },
  }) => ({
    day,
    country,
    cases: { new: nCases, total: tCases },
    deaths: { new: nDeaths, total: tDeaths },
    tests: { total: tTest },
  }))(item);
  newItem.cases.new = parseInt(newItem.cases.new, 10);
  newItem.deaths.new = parseInt(newItem.deaths.new, 10);

  if (Number.isNaN(newItem.cases.new)) newItem.cases.new = 0;
  if (Number.isNaN(newItem.deaths.new)) newItem.deaths.new = 0;
  if (Number.isNaN(newItem.deaths.total)) newItem.deaths.total = 0;
  if (Number.isNaN(newItem.tests.total)) newItem.tests.total = 0;
  return newItem;
}

export function getDateAsHours(time: string): any {
  const startHourPosition = 11;
  const endHourPosition = 16;
  return time.substring(startHourPosition, endHourPosition);
}

export function getDateAsArray(time: string): Number[] {
  const startDatePosition = 11;
  const endDatePosition = 19;
  const t = time
    .substring(startDatePosition, endDatePosition)
    .split(':')
    .map((s) => +s);
  t[0] = t[0] - 1; // google charts show time which is increased by 1 so I reduced time by 1, thanks to this time which is showed on the bar is reliable
  return t;
}

export function formatDate(date: Date): string {
  const startDatePosition = 0;
  const endDatePosition = 10;
  let dateAsLocalDate = new Date(date).toLocaleDateString();

  if (dateAsLocalDate[1] == '.') dateAsLocalDate = `0${dateAsLocalDate}`;

  const dateAsArray = dateAsLocalDate
    .substring(startDatePosition, endDatePosition)
    .split('.');

  const formattedDate = `${dateAsArray[2]}-${dateAsArray[1]}-${dateAsArray[0]}`;

  return formattedDate;
}

// I created this function because in my opinion data will be shown better if we have more samples. Before 12 a.m. were only a few samples with data so it didn't look so good
export function getDataAfterHour(array: any, hour: number): Array<any> {
  return array.filter((el: Array<number>) => {
    if (el[0][0] >= hour) return el;
  });
}
