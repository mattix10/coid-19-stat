import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-core-chart',
  styleUrls: ['core-chart.component.css'],
  template: ` <div #coreChart class="core-chart"></div>`,
})
export class CoreChartComponent implements AfterViewInit {
  @ViewChild('coreChart') coreChart: ElementRef;
  @Input('data') data: Array<string>;
  @Input('config') config: any;

  drawChart = (): any => {
    const data = google.visualization.arrayToDataTable(this.data);

    const options = {
      title: '',
      hAxis: {
        title: 'Godzina (statystyki dla USA z dnia 2020-06-03)',
        titleTextStyle: { color: '#333' },
        direction: -1,
        showTextEvery: 21,
      },
      legend: {
        position: 'top',
        alignment: 'center',
      },
      colors: [this.config.color, '#004411'],
    };

    const chart = new google.visualization.AreaChart(
      this.coreChart.nativeElement
    );

    chart.draw(data, options);
    window.addEventListener('resize', this.drawChart, false);
  };

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
