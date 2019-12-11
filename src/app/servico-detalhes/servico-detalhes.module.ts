import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicoDetalhesPage } from './servico-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ServicoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicoDetalhesPage]
})
export class ServicoDetalhesPageModule {}
