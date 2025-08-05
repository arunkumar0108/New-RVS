import { EmployeeService } from '../_service/employee.service';
import { AuthService, ICurrentUser } from '../_user/auth.service';
import { Router } from '@angular/router';
import { IEmployee, IUser } from '../_model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeListComponent implements OnInit {

  employees: IEmployee[] = [];
  j: ICurrentUser | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });

    // Subscribe to login status
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.j = this.authService.getUser();
      } else {
        this.j = null;
      }

    });

    this.updateLoginStatus();

    // Listen for storage events to detect login changes in other tabs
    window.addEventListener('storage', () => {
      this.updateLoginStatus();
    });
  }

  updateLoginStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.j = this.authService.getUser();
    }
  }

  logout() {
    this.authService.logout();
  }
}