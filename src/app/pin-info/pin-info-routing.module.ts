import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PinInfoPage } from './pin-info.page';

const routes: Routes = [
  {
    path: '',
    component: PinInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinInfoPageRoutingModule {}
