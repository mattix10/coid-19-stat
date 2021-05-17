import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [TopBarComponent, SideBarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [TopBarComponent, SideBarComponent],
})
export class LayoutModule {}
