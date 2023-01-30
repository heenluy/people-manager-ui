import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/containers/login/login.page';

const routes: Routes = [
  { path: 'singin', component: LoginPage, title: 'Sing In — Entrar no painel administrativo' },
  { path: '', redirectTo: 'singin', pathMatch: 'full' },
  { 
    path: 'dashboard',
      loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
