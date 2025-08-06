import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeRouterModule } from './employee-router.module';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AuthInterceptor } from './_intersecepter/auth.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from "./footer/footer.component";
import { Footer1Component } from './footer1/footer1.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    RegisterComponent,
    EmployeeDetailsComponent,
    EmployeeAttendanceComponent,
    HomeComponent,
    InfoComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    LoadingComponent,
    Footer1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    EmployeeRouterModule,
    ReactiveFormsModule,
    FooterComponent
],
   providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

