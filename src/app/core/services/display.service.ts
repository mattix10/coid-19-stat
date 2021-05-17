import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  public showSideBar = new BehaviorSubject(true);
  public showInfoBar = new BehaviorSubject(true);
  public showCountryTable = new BehaviorSubject(true);

  public displaySideBar: boolean = true;
  public displayInfoBar: boolean = true;
  public displayCountryTable: boolean = true;

  toggleSideBar(): void {
    this.displaySideBar = !this.displaySideBar;
    this.showSideBar.next(this.displaySideBar);
  }

  toggleInfoBar(): void {
    this.displayInfoBar = !this.displayInfoBar;
    this.showInfoBar.next(this.displayInfoBar);
  }

  displayCountries(): void {
    this.displayCountryTable = true;
    this.showCountryTable.next(this.displayCountryTable);
  }

  displayContinents(): void {
    this.displayCountryTable = false;
    this.showCountryTable.next(this.displayCountryTable);
  }
}
