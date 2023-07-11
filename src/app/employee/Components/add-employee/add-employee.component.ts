import { Component } from '@angular/core';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee:Employee={
    id:"",
    name:"",
    email:"",
    department:"",
    salary:0
  };
  constructor(private servces:EmployeeService,private router:Router){}

  AddEmployeeComponent(){
    this.servces.addEmployee(this.employee).subscribe({
      next:(emp)=>{
        this.router.navigate(['/employee/employeeList'])
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
