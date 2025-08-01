import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IEmployee } from '../_model/user.model';
import { ApiResponse } from '../_environment/api.component';

const EMP_URL = 'https://localhost:44301/api/Employee';

@Injectable({
  providedIn: 'root'
})
  
export class EmployeeService {

  employeeList: IEmployee[] = [];


  constructor(private http: HttpClient, private apiresponse: ApiResponse) {}

  // getEmployees(): Observable<IEmployee[]> {
  //   return this.http.get<IEmployee[]>(EMP_URL).pipe(
  //     map(response => { 
  //       this.employeeList = response;
  //       return this.employeeList;
  //     })
  //   );
  // }
  
  // getEmployees(): Observable<IEmployee[]> {
  //   return this.http.get<IEmployee[]>(EMP_URL);
  // }

  
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiresponse.employeeUrl);
  }

  getEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${EMP_URL}/${id}`);
  }


  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(EMP_URL, employee);
  }

  updateEmployee(id: number, data: IEmployee): Observable<any> {
    return this.http.put(`${EMP_URL}/${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${EMP_URL}/${id}`);
  }

  // this.isLoggedIn = !!localStorage.getItem('token');

}



