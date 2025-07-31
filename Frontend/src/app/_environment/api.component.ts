import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiResponse {
  public userUrl = 'https://localhost:44301/api/User';
  public employeeUrl = 'https://localhost:44301/api/Employee';
}

