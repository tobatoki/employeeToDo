import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseApiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.baseApiUrl)
  }
  
  addEmployee(employeeName: string): Observable<Employees[]> {
    return this.http.post<Employees[]>(this.baseApiUrl, { employeeName: employeeName });
  }

  deleteEmployee(employeeID: number): Observable<Employees> {
    return this.http.delete<Employees>(this.baseApiUrl, {
      body: { employeeID }
    });
  }
}
