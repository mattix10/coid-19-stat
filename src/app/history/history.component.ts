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

const CONFIG: object = {
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
  public cases: CoreChart = [
    ['Godzina', 'Aktywnie zakażeni', 'W stanie krytycznym', 'Wyzdrowiałych'],
  ];
  public tests: CoreChart = [['Godzina', 'Ilość testów na milion mieszkańców']];
  public criticalCases: CoreChart = [
    ['Godzina', 'Ilość pacjentów w stanie krytycznym'],
  ];
  public recoveredCases: CoreChart = [['Godzina', 'Ilość wyzdrowień']];
  public totalCases: CoreChart = [['Godzina', 'Ilość przypadków']];
  public newCases: BarChart = [];
  public newDeaths: BarChart = [];
  public config: object = CONFIG;
  public countryInfo: CountryInfo;
  public day: string = '2020-06-03';
  public country: string = 'USA';
  public countries: Array<string> = [this.country];
  public isFetchingHistory: boolean;
  public isFetchingCountries: boolean;
  public updateCountryInfo: boolean = false;
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
            'Nieprawidłowe dane lub brak danych do wyświetlenia. Spróbuj ponownie.';
        } else this.countryInfo = destructItem(response[0]);

        if (!this.updateCountryInfo) this.fillArrays(response);
        this.updateCountryInfo = false;
      });
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
    this.newCases.push([getDateAsArray(o.time), parseInt(o.cases.new)]);
  }

  fillNewDeaths(o): void {
    this.newDeaths.push([getDateAsArray(o.time), parseInt(o.deaths.new)]);
  }

  fillRecoveredCases(o): void {
    this.recoveredCases.push([
      getDateAsHours(o.time),
      parseInt(o.cases.recovered),
    ]);
  }

  fillTests(o): void {
    this.tests.push([getDateAsHours(o.time), parseInt(o.tests['1M_pop'])]);
  }

  fillCriticalCases(o): void {
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
