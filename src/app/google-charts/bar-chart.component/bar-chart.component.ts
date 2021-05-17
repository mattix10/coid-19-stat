import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-bar-chart',
  styleUrls: ['./bar-chart.component.css'],
  template: `<div class="wrapper"><div #bar class="bar-chart"></div></div>`,
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('bar') bar: ElementRef;
  @Input('cases') cases: Array<string>;
  @Input('config') config: any;

  drawChart = (): any => {
    let data = new google.visualization.DataTable();
    this.cases = Object.assign([], this.cases);

    data.addColumn('timeofday', ' ');
    data.addColumn('number', this.config.title);
    data.addRows(this.cases);

    const options = {
      title: this.config.title,
      subtitle: 'Statystyki dla USA z dnia 2020-06-03',
      legend: { position: 'none' },
      height: '450px',
      colors: this.config.color,
    };

    let chart = new google.charts.Bar(this.bar.nativeElement);

    chart.draw(data, google.charts.Bar.convertOptions(options));
    window.addEventListener('resize', this.drawChart, false);
  };

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
