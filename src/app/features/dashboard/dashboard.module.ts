import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthInterceptor } from 'src/app/shared/services/auth.interceptor';
import { PersonService } from './services/person.service';
import { PersonListComponent } from './person-list/person-list.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PersonListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PersonService,
  ]
})
export class DashboardModule { }
