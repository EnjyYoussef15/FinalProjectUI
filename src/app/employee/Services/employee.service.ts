import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

baseUrl: string = 'https://localhost:7123';
  constructor(private httpClient:HttpClient) { }

  public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl + '/api/employee');
  }
  addEmployee(emp:Employee):Observable<Employee>{
    emp.id="9070e7e0-7496-4b89-5179-08db768553c4";
    return this.httpClient.post<Employee>(this.baseUrl+'/api/employee',emp)
  }

  getEmployeeByID(id:string){
    return this.httpClient.get<Employee>(this.baseUrl + '/api/employee/'+id);
  }

  UpdateEmployee(id:string,employee:Employee){
    return this.httpClient.put<Employee>(this.baseUrl + '/api/employee/'+id,employee);
  }

  deleteEmployee(id:string){
    return this.httpClient.delete<Employee>(this.baseUrl + '/api/employee/'+id);
  }
}
