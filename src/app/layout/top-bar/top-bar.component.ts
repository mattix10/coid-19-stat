import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  constructor(public displayService: DisplayService) {}

  toggleMenu(): void {
    this.displayService.toggleSideBar();
  }

  ngOnInit(): void {}
}
