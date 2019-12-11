import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReclameaquiPage } from './reclameaqui.page';

const routes: Routes = [
  {
    path: '',
    component: ReclameaquiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReclameaquiPage]
})
export class ReclameaquiPageModule {}
