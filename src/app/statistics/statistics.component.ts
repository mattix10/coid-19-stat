import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Statistics } from '../shared/models/Statistics.model';
import { destructItem } from '../utils/utils';
import { HttpService } from '../core/services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DisplayService } from '../core/services/display.service';

const CONTINENTS: string[] = [
  'All',
  'Asia',
  'North-America',
  'South-America',
  'Europe',
  'Africa',
  'Australia',
];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['country', 'cases', 'deaths', 'tests'];
  public countries: Array<Statistics> = [];
  public continents: Array<Statistics> = [];
  public state: boolean = true;
  public isFetchingStatistics;
  public error = null;
  public displayCountry: boolean = true;
  private showCountryTableSubscription: any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private http: HttpService,
    private displayService: DisplayService
  ) {}

  sortData(): any {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  ngAfterViewInit(): void {
    this.checkState();
    this.sortData();
  }

  getPropertyByPath(obj: Object, pathString: string): string | number {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.refresh();
    this.showCountryTableSubscription = this.displayService.showCountryTable.subscribe((data: any) => {
      this.displayCountry = data;
      this.checkState();
    });
  }

  refresh(): void {
    this.isFetchingStatistics = true;
    this.http
      .getStatistics()
      .pipe(
        map((data) => data.response),
        catchError((err) => {
          this.error = 'Błąd. Nie udało się pobrać statystyk';
          return throwError(err);
        })
      )
      .subscribe((response) => {
        this.isFetchingStatistics = false;
        if (!response.length)
          this.error = 'Nie udało się pobrać statystyk. Spróbuj ponownie.';
        response.map((item) => {
          const itemStats = destructItem(item);
          this.checkIsCountryOrContinent(itemStats);
        });
        this.checkState();
      });
  }

  checkState(): void {
    if (this.displayCountry) {
      this.dataSource = new MatTableDataSource(this.countries);
    } else {
      this.dataSource = new MatTableDataSource(this.continents);
    }
  }

  checkIsCountryOrContinent(itemStats): void {
    if (CONTINENTS.indexOf(itemStats.country) > -1) {
      this.continents.push(itemStats);
    } else this.countries.push(itemStats);
  }

  ngOnDestroy(): void {
    this.showCountryTableSubscription.unsubscribe();
  }
}
