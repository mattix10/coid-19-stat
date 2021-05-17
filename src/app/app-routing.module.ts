import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  { path: '', redirectTo: '/history', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'history',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
