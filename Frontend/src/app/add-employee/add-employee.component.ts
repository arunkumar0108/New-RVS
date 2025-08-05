<<<<<<< HEAD
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_service/employee.service';
import { IEmployee } from '../_model/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  employee: IEmployee = {
    id: 0,
    employeeId: '',
    name: '',
    designation: '',
    salary: '',
    experience: ''
  };

  errorMessage: string = '';
  
  constructor(private router: Router, private employeeService: EmployeeService) { }

  //  onSubmit() {
  //   this.employeeService.addEmployee(this.employee).subscribe(response => {
  //     alert('Employee saved!');
  //     this.router.navigate(['/emp-details']);
  //   });
  // }

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        alert('Employee saved!');
        this.router.navigate(['/emp-details']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 200 && err.error === 'An Employee with that EmployeeId already exists.') {
          this.errorMessage = 'That Employee ID is already in use — please choose another.';
        } else {
          this.errorMessage = 'Unexpected error: ' + (err.error || err.message);
        }
      }
    });
  }
}


=======
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_service/employee.service';
import { IEmployee } from '../_model/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  employee: IEmployee = {
    id: 0,
    employeeId: '',
    name: '',
    designation: '',
    salary: '',
    experience: ''
  };

  errorMessage: string = '';
  
  constructor(private router: Router, private employeeService: EmployeeService) { }

  //  onSubmit() {
  //   this.employeeService.addEmployee(this.employee).subscribe(response => {
  //     alert('Employee saved!');
  //     this.router.navigate(['/emp-details']);
  //   });
  // }

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        alert('Employee saved!');
        this.router.navigate(['/emp-details']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 200 && err.error === 'An Employee with that EmployeeId already exists.') {
          this.errorMessage = 'That Employee ID is already in use — please choose another.';
        } else {
          this.errorMessage = 'Unexpected error: ' + (err.error || err.message);
        }
      }
    });
  }
}


>>>>>>> 4691866 (Arun changes push)
