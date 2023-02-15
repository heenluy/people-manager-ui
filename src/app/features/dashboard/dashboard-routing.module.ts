import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { CreatePersonComponent } from './create-person/create-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard — Início',
        children: [
            {
                path: 'person-list',
                component: PersonListComponent,
                title: 'Pessoas — Exibir todas'
            },
            {
                path: '',
                redirectTo: 'person-list',
                pathMatch: 'full'
            },
            {
                path: 'create-person',
                component: CreatePersonComponent,
                title: 'Pessoas — Criar pessoa'
            },
            {
                path: 'edit-person',
                component: EditPersonComponent,
                title: 'Pessoas — Alterar pessoa'
            },
            {
                path: 'delete-person',
                component: DeletePersonComponent,
                title: 'Pessoas — Deletar pessoa'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DashboardRoutingModule {}