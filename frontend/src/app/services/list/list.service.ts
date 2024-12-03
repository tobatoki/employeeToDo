import { Injectable } from '@angular/core';
import { List } from '../../../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient: HttpClient) { }

  private baseApiUrl = 'http://localhost:3000';

  getEmployeeList(employeeID: number): Observable<List[]> {
    return this.httpClient.get<List[]>(`${this.baseApiUrl}/${employeeID}/list`)
  }

  addEmployeeList(listname: string, employeeID: number): Observable<List[]> {
    return this.httpClient.post<List[]>(`${this.baseApiUrl}/${employeeID}/list`, { listname });
  }

  deleteEmployeeList(listid: number, employeeID: number): Observable<List[]> {
    return this.httpClient.delete<List[]>(`${this.baseApiUrl}/${employeeID}/list`,
      {
        body: { listid, employeeID }
      });
  }
}
