import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagamentoPayPalPage } from './pagamento-pay-pal.page';

const routes: Routes = [
  {
    path: '',
    component: PagamentoPayPalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [PagamentoPayPalPage]
})
export class PagamentoPayPalPageModule {}
