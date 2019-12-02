import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  showSplash = true;
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Feedback',
      url: '/feedback',
      icon: 'bookmarks'
    },
    {
      title: 'Cadastrar Feedback',
      url: '/feedback-cadastro',
      icon: 'list'
    },
    {
      title: 'Developers',
      url: '/funcionario',
      icon: 'code'
    },
    {
      title: 'Cadastrar Developer',
      url: '/funcionario-cadastro',
      icon: 'code-working'
    },
    {
      title: 'Editar Perfil',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Perfil',
      url: '/editarperfil',
      icon: 'person'
    },
    {
      title: 'Pagamento',
      url: '/pagamento-pay-pal',
      icon: 'cart'
    },
    {
      title: 'Carrinho',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'Mapa',
      url: '/location',
      icon: 'code-working'
    },
    {
      title: 'Contato',
      url: '/contato',
      icon: 'person'
    },
    {
      title: 'Política de privacidade',
      url: '/privacidade',
      icon: 'person'
    },
    {
      title: 'Sobre nós',
      url: '/sobre',
      icon: 'person'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'log-out'
    },
  
  ];

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer (3000).subscribe(() => this.showSplash = false)
    });
  }
}
