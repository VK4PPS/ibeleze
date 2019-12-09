import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule} from '@ionic/angular';

import { PerfilProPage } from './perfil-pro.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [PerfilProPage]
})
export class PerfilProPageModule {}
