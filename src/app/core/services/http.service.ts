import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HistoryData } from '../../shared/models/HistoryData.model';
import { StatisticsData } from 'src/app/shared/models/StatisticsData.model';
import { CountriesData } from 'src/app/shared/models/CountriesData.model';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
const API_HOST = environment.API_HOST;
const headers = {
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': API_HOST,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public getStatistics(): Observable<StatisticsData> {
    return this.http.get<StatisticsData>(`${API_URL}statistics`, { headers });
  }

  public getCountries(): Observable<CountriesData> {
    return this.http.get<CountriesData>(`${API_URL}countries`, { headers });
  }

  public getHistory(country: string, day: string): Observable<HistoryData> {
    let historyParams = new HttpParams();
    historyParams = historyParams.append('country', `${country}`);
    historyParams = historyParams.append('day', `${day}`);
    const options = { headers: headers, params: historyParams };

    return this.http.get<HistoryData>(`${API_URL}history`, options);
  }
}
