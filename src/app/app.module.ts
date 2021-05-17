import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './shared/material.module';
import { GoogleChartsModule } from './google-charts/google-charts.module';

import { HttpService } from './core/services/http.service';
import { DisplayService } from './core/services/display.service';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ErrorComponent } from './shared/error/error.component';
import { InfoBarComponent } from './history/info-bar/info-bar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    StatisticsComponent,
    ErrorComponent,
    InfoBarComponent,
    SpinnerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [HttpService, DisplayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
