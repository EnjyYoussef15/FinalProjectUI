import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employeeList: Employee[]=[];

  constructor(private services:EmployeeService){}
  ngOnInit(): void {
this.services.getAllEmployees().subscribe({
  next:(emp)=>{
    this.employeeList=emp;
  },
  error:(err)=>{
    console.log(err);
  }
});
  }

}
