import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';


const routes:Routes=[
  {path:'employeeList',component:EmployeeListComponent},
  {path:'add',component:AddEmployeeComponent},
  {path:'edit/:id',component:UpdateEmployeeComponent}
]

@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeModule{ }
