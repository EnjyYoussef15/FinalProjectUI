import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerifyAccountComponent } from './Components/verify-account/verify-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { userAuthGGuard } from './Guird/user-auth-g.guard';


const routes:Routes=[
  {
    path:'register',component:RegisterComponent
  },
  {path:'login',component:LoginComponent},
  {path:'verify',component:VerifyAccountComponent,canActivate:[userAuthGGuard]}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
