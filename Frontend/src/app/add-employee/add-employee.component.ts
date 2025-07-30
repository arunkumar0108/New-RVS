import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_service/employee.service';
import { IEmployee } from '../_model/user.model';

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
  
  constructor(private router: Router, private employeeService: EmployeeService) { }

   onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe(response => {
      alert('Employee saved!');
      this.router.navigate(['/emp-details']);
    });
  }
}


