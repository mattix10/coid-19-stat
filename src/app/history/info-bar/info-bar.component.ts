import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DisplayService } from 'src/app/core/services/display.service';
import { CountryInfo } from 'src/app/shared/models/CountryInfo.model';
import { formatDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-infobar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css'],
})
export class InfoBarComponent {
  @Input('data') data: CountryInfo;
  @Input('countries') countries: Array<string>;
  @Output() newDateEvent = new EventEmitter<string>();
  @Output() newCountryEvent = new EventEmitter<string>();

  public defaultDate: FormControl = new FormControl(new Date('March 06, 2020'));
  public defaultCountry: string = 'USA';
  public displayInfoBar: boolean;

  constructor(public displayService: DisplayService) {}

  ngOnInit(): void {
    this.displayService.showInfoBar.subscribe((data) => {
      this.displayInfoBar = data;
    });
    this.getWidthView();
  }
  setDate(date: Date): void {
    const formattedDate = formatDate(date);
    this.newDateEvent.emit(formattedDate);
  }

  setCountry(country: string): void {
    this.newCountryEvent.emit(country);
  }

  showInfoBar(): void {
    this.displayService.toggleInfoBar();
  }

  getWidthView() {
    const widthView = window.innerWidth;
    const defaultWidth = 676;
    if (widthView < defaultWidth) this.displayService.toggleSideBar();
  }

  // ngOnDestroy(): void {
  //   this.displayService.showInfoBar.unsubscribe();
  // }
}
