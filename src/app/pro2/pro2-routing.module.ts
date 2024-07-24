import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pro2Page } from './pro2.page';

const routes: Routes = [
  {
    path: '',
    component: Pro2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pro2PageRoutingModule {}
