import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import { OffersComponent } from './Components/offers/offers.component';
import { HttpClientModule } from '@angular/common/http';

const routes:Routes=[
  {path:'offers',component:OffersComponent,canActivate:[userAuthGGuard]}
]

@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }
