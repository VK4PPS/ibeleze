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
  { path: 'editarperfil', loadChildren: './editarperfil/editarperfil.module#EditarperfilPageModule' },
  { path: 'contato', loadChildren: './contato/contato.module#ContatoPageModule' },
  { path: 'privacidade', loadChildren: './privacidade/privacidade.module#PrivacidadePageModule' },
  { path: 'sobre', loadChildren: './sobre/sobre.module#SobrePageModule' },  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'servicos', loadChildren: './servicos/servicos.module#ServicosPageModule' },
  { path: 'perfil-pro', loadChildren: './perfil-pro/perfil-pro.module#PerfilProPageModule' },
  { path: 'servico-detalhes', loadChildren: './servico-detalhes/servico-detalhes.module#ServicoDetalhesPageModule' },
  { path: 'reclameaqui', loadChildren: './reclameaqui/reclameaqui.module#ReclameaquiPageModule' },
  { path: 'reclameaqui-cadastro', loadChildren: './reclameaqui-cadastro/reclameaqui-cadastro.module#ReclameaquiCadastroPageModule' },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosPageModule' },
  { path: 'produto-single', loadChildren: './produto-single/produto-single.module#ProdutoSinglePageModule' },
  { path: 'pedido-status', loadChildren: './pedido-status/pedido-status.module#PedidoStatusPageModule' },
  { path: 'compra-status', loadChildren: './compra-status/compra-status.module#CompraStatusPageModule' },
  { path: 'favoritos', loadChildren: './favoritos/favoritos.module#FavoritosPageModule' },

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
