import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarChartComponent } from './bar-chart.component/bar-chart.component';
import { CoreChartComponent } from './core-chart.component/core-chart.component';

@NgModule({
  declarations: [BarChartComponent, CoreChartComponent],
  imports: [CommonModule],
  exports: [BarChartComponent, CoreChartComponent],
})
export class GoogleChartsModule {}
