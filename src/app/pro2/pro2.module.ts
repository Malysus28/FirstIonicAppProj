import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pro2PageRoutingModule } from './pro2-routing.module';

import { Pro2Page } from './pro2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pro2PageRoutingModule
  ],
  declarations: [Pro2Page]
})
export class Pro2PageModule {}
