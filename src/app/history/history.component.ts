import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import {
  destructItem,
  getDateAsArray,
  getDateAsHours,
  getDataAfterHour,
} from '../utils/utils';
import { CountryInfo } from '../shared/models/CountryInfo.model';
import { BarChart } from '../shared/models/BarChart.model';
import { CoreChart } from '../shared/models/CoreChart.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

let CONFIG: object = {
  newCases: {
    color: 'rgb(21, 135, 211)',
    title: 'Liczba nowych przypadków zachorowań',
  },
  newDeaths: {
    color: 'grey',
    title: 'Liczba nowych zgonów',
  },
  cases: {
    color: 'blue',
  },
  recoveredCases: {
    color: 'blue',
  },
  criticalCases: {
    color: 'red',
  },
  tests: {
    color: 'green',
  },
  totalCases: {
    color: 'yellow',
  },
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public newCases: BarChart;
  public newDeaths: BarChart;
  public cases: CoreChart;
  public tests: CoreChart;
  public criticalCases: CoreChart;
  public recoveredCases: CoreChart;
  public totalCases: CoreChart;
  public config: object = CONFIG;
  public countryInfo: CountryInfo;
  public day: string = '2020-06-03';
  public country: string = 'USA';
  public countries: Array<string> = [this.country];
  public isFetchingHistory: boolean;
  public isFetchingCountries: boolean;
  public updateCountryInfo: boolean = false;
  public minDataDisplay: number = 4;
  public error: string | null = null;

  constructor(public HttpService: HttpService) {}

  ngOnInit(): void {
    this.onFetchCountries();
    this.onFetchHistory();
  }

  setNewDate(newDate: string): void {
    this.updateCountryInfo = true;
    this.day = newDate;
    this.error = null;
    this.onFetchHistory();
    window.scrollTo(0, 0);
  }

  setNewCountry(newCountry: string): void {
    this.updateCountryInfo = true;
    this.country = newCountry;
    this.error = null;
    this.onFetchHistory();
  }

  onFetchCountries(): void {
    this.isFetchingCountries = true;
    this.HttpService.getCountries().subscribe(
      (data) => {
        this.isFetchingCountries = false;
        this.countries = data.response;
      },
      () => {
        this.isFetchingCountries = false;
        this.error = 'Nie udało się pobrać danych.';
      }
    );
  }

  onFetchHistory(): void {
    this.isFetchingHistory = true;

    this.initArrays();

    this.HttpService.getHistory(this.country, this.day)
      .pipe(
        map((data) => data.response),
        catchError((err) => {
          this.error = 'Błąd. Nie udało się pobrać danych.';
          return throwError(err);
        })
      )
      .subscribe((response) => {
        this.isFetchingHistory = false;

        if (!response.length) {
          this.setEmptyCountryInfo();
          this.error =
            'Nieprawidłowe dane lub za mało danych, aby móc wyświetlić wykresy. Spróbuj ponownie.';
        } else this.countryInfo = destructItem(response[0]);

        if (response.length < this.minDataDisplay && this.error == null)
          this.error = 'Za mało danych, aby móc wyświetlić wykresy';
        else this.fillArrays(response);

        this.updateCountryInfo = false;
      });
  }

  initArrays(): void {
    this.newCases = [];
    this.newDeaths = [];
    this.cases = [
      ['Godzina', 'Aktywnie zakażeni', 'W stanie krytycznym', 'Wyzdrowiałych'],
    ];
    this.tests = [['Godzina', 'Ilość testów na milion mieszkańców']];
    this.criticalCases = [['Godzina', 'Ilość pacjentów w stanie krytycznym']];
    this.recoveredCases = [['Godzina', 'Ilość wyzdrowień']];
    this.totalCases = [['Godzina', 'Ilość przypadków']];
  }

  fillArrays(array: Array<any>): void {
    array.map((o) => {
      this.fillNewCases(o);
      this.fillNewDeaths(o);
      this.fillCases(o);
      this.fillTests(o);
      this.fillCriticalCases(o);
      this.fillRecoveredCases(o);
      this.fillTotalCases(o);
    });
    this.newCases = getDataAfterHour(this.newCases, 12);
    this.newDeaths = getDataAfterHour(this.newDeaths, 12);
  }

  fillNewCases(o): void {
    if (Number.isNaN(parseInt(o.cases.new))) return;
    this.newCases.push([getDateAsArray(o.time), parseInt(o.cases.new)]);
  }

  fillNewDeaths(o): void {
    if (Number.isNaN(parseInt(o.deaths.new))) return;
    this.newDeaths.push([getDateAsArray(o.time), parseInt(o.deaths.new)]);
  }

  fillRecoveredCases(o): void {
    if (Number.isNaN(parseInt(o.cases.recovered))) return;
    this.recoveredCases.push([
      getDateAsHours(o.time),
      parseInt(o.cases.recovered),
    ]);
  }

  fillTests(o): void {
    if (Number.isNaN(parseInt(o.tests['1M_pop']))) return;
    this.tests.push([getDateAsHours(o.time), parseInt(o.tests['1M_pop'])]);
  }

  fillCriticalCases(o): void {
    if (Number.isNaN(parseInt(o.cases.critical))) return;
    this.criticalCases.push([getDateAsHours(o.time), o.cases.critical]);
  }

  fillTotalCases(o): void {
    this.totalCases.push([getDateAsHours(o.time), o.cases.total]);
  }

  fillCases(o): void {
    this.cases.push([
      getDateAsHours(o.time),
      o.cases.active,
      o.cases.critical,
      o.cases.recovered,
    ]);
  }

  setEmptyCountryInfo(): CountryInfo {
    return (this.countryInfo = {
      day: this.day,
      country: this.country,
      cases: {
        new: '',
        total: '',
      },
      deaths: {
        new: '',
        total: '',
      },
      tests: {
        total: '',
      },
    });
  }
}
