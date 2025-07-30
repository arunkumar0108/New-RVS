import { Component } from '@angular/core';
import { EmployeeService } from '../_service/employee.service';
import { Router } from '@angular/router';
import { IEmployee } from '../_model/user.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  employees: IEmployee[] = [];
  isLoading: boolean = true;
  showData: boolean = true;
  id: number = 0;

  constructor(private employeeService: EmployeeService, private router: Router) { }
  
  addpage() {
    this.router.navigateByUrl('/add-employee');
  }

 ngOnInit(): void {
  this.employeeService.getEmployees().subscribe({
    next: (data) => {
      this.employees = data.map(emp => ({
        id: emp.id,
        employeeId: emp.employeeId,
        name: emp.name,
        designation: emp.designation,
        salary: emp.salary,
        experience: emp.experience
      }));
      this.isLoading = false;
      this.showData = false;
    },
    error: (err) => {
      console.error('Failed to fetch employees', err);
    }
  });
}



  editEmp(emp: IEmployee) {
    this.router.navigate(['/edit-employee',emp.id]);
  }
//   editEmp(emp: IEmployee) {
//   this.router.navigate(['/edit-employee', emp.id]);
// }

  refreshEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
    this.isLoading = false;
  }

  
  confirmDelete(Id: number) {
    const confirmResult = window.confirm("Are you sure you want to delete this employee?");
    if (confirmResult) {
      this.employeeService.deleteEmployee(Id).subscribe(() => {
        alert("Employee deleted successfully!");
        this.refreshEmployees();
        this.isLoading = false;
      }, error => {
        console.error("Delete failed", error);
      });

    }
  }

}
