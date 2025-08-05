import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from '../_service/employee.service';
import { IEmployee } from '../_model/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  formEdit!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
      
  }

  employee: IEmployee = {
    id: 0,
    employeeId: '',
    name: '',
    salary: '',
    designation: '',
    experience: ''
  };

  initForm() {
    this.formEdit = new FormGroup({
      Id: new FormControl(null),
      EmployeeId: new FormControl(null),
      Name: new FormControl(null),
      Salary: new FormControl(null),
      Designation: new FormControl(null),
      Experience: new FormControl(null),
    });
  }


  // populateForm() {
  //   this.formEdit.patchValue({
  //     EmployeeId: this.employee.EmployeeId,
  //     Name: this.employee.Name,
  //     Designation: this.employee.Designation,
  //     Salary: this.employee.Salary,
  //     Experience: this.employee.Experience
  //   })
  // }

  // populateForm() {
  //   this.formEdit.patchValue({
  //     Id: this.employee.Id,
  //     EmployeeId: this.employee.EmployeeId,
  //     Name: this.employee.Name,
  //     Designation: this.employee.Designation,
  //     Salary: this.employee.Salary,
  //     Experience: this.employee.Experience
  //   });
  // }


 ngOnInit(): void {
  this.formEdit = this.fb.group({
    id: [0],
    employeeId: [''],
    name: [''],
    designation: [''],
    salary: [''],
    experience: ['']
  });

  // ✅ Safer way to extract ID from route
  const idParam = this.route.snapshot.paramMap.get('id');
  if (!idParam) {
    alert('Invalid employee ID in URL.');
    return;
  }

  const id = Number(idParam);
  if (isNaN(id) || id <= 0) {
    alert('Invalid employee ID format.');
    return;
  }

  this.employeeService.getEmployeeById(id).subscribe({
    next: (data: any) => {
      console.log('Employee data:', data);
      this.formEdit.patchValue(data);
    },
    error: (error) => {
      console.error('error fetching employee data:', error);
      alert('Error fetching employee data');
    }
  });
}


            
       
     

    //  this.initForm();
    //  this.populateForm();

    // if (this.id) {
    //   this.employeeService.getEmployeeById(this.id).subscribe((responseData: IEmployee) => {
    //     this.employee = responseData;
    //     this.populateForm();
    //   });
    // }


    //   const id = Number(this.route.snapshot.paramMap.get('id'));
    //     this.employeeService.getEmployeeById(id).subscribe((responseData: any) => {
    //       this.formEdit.setValue(responseData);
    //       this.populateForm();
    //     });
    // }



  
  


    onSubmit() {
      // this.employeeService.updateEmployee(this.employee).subscribe(() => {
      //   alert('Employee updated successfully!');
      //   this.router.navigate(['/emp-details']);
      // });
      // this.http.put(`api/employee/${this.employee.Id}`, this.employee).subscribe(res => {
      //   console.log('Employee updated successfully!', res);
      //   this.populateForm();
      // });

      const updateEmp = this.formEdit.value;
      const id = updateEmp.id;
      this.employeeService.updateEmployee(id, updateEmp).subscribe(res => {
        alert('Employee updated successfully!');
        this.router.navigate(['/emp-details']);
      });
    }
  }

