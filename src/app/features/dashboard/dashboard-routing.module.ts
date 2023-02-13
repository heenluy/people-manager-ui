import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard — Início',
        children: [
            {
                path: 'person-list',
                component: PersonListComponent,
                title: 'Dashboard — Lista de Pessoas'
            },
            {
                path: '',
                redirectTo: 'person-list',
                pathMatch: 'full'
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule {}