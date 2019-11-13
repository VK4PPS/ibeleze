import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate : [AuthGuardService]
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule', canActivate : [AuthGuardService]},
  { path: 'cadastro-usuario', loadChildren: './cadastro-usuario/cadastro-usuario.module#CadastroUsuarioPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule' },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'funcionario', loadChildren: './funcionario/funcionario.module#FuncionarioPageModule' },
  { path: 'funcionario-cadastro', loadChildren: './funcionario-cadastro/funcionario-cadastro.module#FuncionarioCadastroPageModule' },
  { path: 'funcionario-detalhes', loadChildren: './funcionario-detalhes/funcionario-detalhes.module#FuncionarioDetalhesPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'feedback-detalhes', loadChildren: './feedback-detalhes/feedback-detalhes.module#FeedbackDetalhesPageModule' },
  { path: 'feedback-cadastro', loadChildren: './feedback-cadastro/feedback-cadastro.module#FeedbackCadastroPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule' },
  { path: 'pagamento-pay-pal', loadChildren: './pagamento-pay-pal/pagamento-pay-pal.module#PagamentoPayPalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
