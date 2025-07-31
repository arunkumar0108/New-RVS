import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { RegisterComponent } from "./register/register.component";
import { EmployeeAttendanceComponent } from "./employee-attendance/employee-attendance.component";
import { HomeComponent } from "./home/home.component";
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { InfoComponent } from './info/info.component';

    const appRoutes:Routes = [
  {
    path : '',
    component : HomeComponent,
  },
  {
    path:'emp-attendance',
    component: EmployeeAttendanceComponent,
  },
  
  {
    path:'emp-details',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'user-register',
    component: RegisterComponent,
  },
  {
    path:'rvs-info',
    component: InfoComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
  },
  {
    path:'**',
    redirectTo:'not-found',
  }
];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class EmployeeRouterModule{}