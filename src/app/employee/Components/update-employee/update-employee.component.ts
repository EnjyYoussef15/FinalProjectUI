import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee:Employee={
    id:"",
    name:"",
    email:"",
    department:"",
    salary:0
  };
employeeForm:FormGroup;
constructor(private serives:EmployeeService,private route:ActivatedRoute,private router: Router){
  this.employeeForm=new FormGroup({
    id:new FormControl(''),
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.email,Validators.required]),
    department:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required,Validators.min(1500),Validators.max(9000)])
  });
}
  ngOnInit(): void {
this.route.params.subscribe(
  {
    next:(params)=>{
      const id=params['id'];

      if(id){
        this.serives.getEmployeeByID(id).subscribe({
          next:(data)=>{
            this.employee=data;
            this.employeeForm.setValue({
              id:this.employee.id,
              name:this.employee.name,
              email:this.employee.email,
              department:this.employee.department,
              salary:this.employee.salary
            });
            this.employeeForm.valueChanges.subscribe({
              next:(emp)=>{
                this.employee=emp;
              }
            });
          }
        });
      }
    }
  }
);
  }

  updateEmployee(id:string){
    this.serives.UpdateEmployee(id,this.employee).subscribe({
      next:(emp)=>{
        this.router.navigate(['/employee/employeeList']);
      }
    });
  }

  deleteEmployee(id:string){
    this.serives.deleteEmployee(id).subscribe({
      next:(emp)=>{
        this.router.navigate(['/employee/employeeList']);
      }
    });
  }
}
