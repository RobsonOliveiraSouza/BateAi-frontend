import { Routes } from '@angular/router';
import { roleGuard } from './auth/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
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
    canActivate: [roleGuard(['EMPRESA'])],
    loadComponent: () =>
      import('./dashboard/home/home.component').then(m => m.HomeComponent)
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
  }
   
];
