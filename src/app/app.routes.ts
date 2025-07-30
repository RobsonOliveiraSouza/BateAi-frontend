import { Routes } from '@angular/router';
import { roleGuard } from './auth/guards/role.guard';
import { HomeRedirectGuard } from './auth/guards/home-redirect.guard';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [HomeRedirectGuard],
  },  
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'auth/cadastro-empresa',
    loadComponent: () =>
      import('./auth/cadastro-empresa/cadastro-empresa.component').then(m => m.CadastroEmpresaComponent)
  },
  {
    path: 'auth/cadastro-usuario',
    loadComponent: () =>
      import('./auth/cadastro-usuario/cadastro-usuario.component').then(m => m.CadastroUsuarioComponent)
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then(m => m.GameComponent)
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./contato/contato.component').then(m => m.ContatoComponent)
  },
  {
    path: 'ponto/registro',
    canActivate: [roleGuard(['COORDENADOR'])],
    loadComponent: () =>
      import('./ponto/registro-ponto/registro-ponto.component').then(m => m.RegistroPontoComponent)
  },
  {
    path: 'ponto/historico',
    canActivate: [roleGuard(['COLABORADOR'])],
    loadComponent: () =>
      import('./ponto/historico-ponto/historico-ponto.component').then(m => m.HistoricoPontoComponent)
  },
  {
    path: 'dashboard',
    canActivate: [roleGuard(['EMPRESA', 'COORDENADOR', 'COLABORADOR'])],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },  
  {
    path: 'aguarde-aprovacao',
    loadComponent: () =>
      import('./aguarde-aprovacao/aguarde-aprovacao.component').then(m => m.AguardeAprovacaoComponent)
  },
  {
    path: 'acesso-negado',
    loadComponent: () =>
      import('./acesso-negado/acesso-negado.component').then(m => m.AcessoNegadoComponent)
  },
  {
    path: 'usuarios/gerenciar',
    canActivate: [roleGuard(['COORDENADOR'])],
    loadComponent: () => import('./gerenciar-usuarios/gerenciar-usuarios.component').then(m => m.GerenciarUsuariosComponent)
  },

];
