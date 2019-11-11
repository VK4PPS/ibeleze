import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedbackDetalhesPage } from './feedback-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackDetalhesPage
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
  declarations: [FeedbackDetalhesPage]
})
export class FeedbackDetalhesPageModule {}
