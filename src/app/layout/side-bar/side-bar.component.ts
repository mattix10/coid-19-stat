import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from '../../core/services/display.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(public router: Router, public displayService: DisplayService) {}
  public displaySideBar: boolean;

  ngOnInit(): void {
    this.displayService.showSideBar.subscribe((data: boolean) => {
      this.displaySideBar = data;
    });
  }

  closeSideBar(): void {
    this.displayService.toggleSideBar();
  }

  displayCountries(): void {
    this.displayService.displayCountries();
    this.closeSideBar();
  }

  displayContinents(): void {
    this.displayService.displayContinents();
    this.closeSideBar();
  }

  ngOnDestroy(): void {
    this.displayService.showSideBar.unsubscribe();
  }
}
