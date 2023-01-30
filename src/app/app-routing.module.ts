import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/containers/login/login.page';

const routes: Routes = [
  { path: 'auth', component: LoginPage, title: 'Dashboard — Entrar no painel administrativo' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
