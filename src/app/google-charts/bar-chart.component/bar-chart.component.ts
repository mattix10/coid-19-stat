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
  @Input('day') day: string;

  drawChart = (): any => {
    let data = new google.visualization.DataTable();

    data.addColumn('timeofday', ' ');
    data.addColumn('number', this.config.title);
    data.addRows(this.cases);

    const options = {
      title: this.config.title,
      subtitle: `Statystyki z dnia ${this.day}`,
      legend: { position: 'none' },
      height: '450px',
      colors: this.config.color,
    };

    let chart = new google.charts.Bar(this.bar.nativeElement);

    chart.draw(data, google.charts.Bar.convertOptions(options));
    window.addEventListener('resize', this.drawChart, false);
  };

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
