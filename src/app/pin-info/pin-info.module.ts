import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinInfoPageRoutingModule } from './pin-info-routing.module';

import { PinInfoPage } from './pin-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinInfoPageRoutingModule
  ],
  declarations: [PinInfoPage]
})
export class PinInfoPageModule {}
