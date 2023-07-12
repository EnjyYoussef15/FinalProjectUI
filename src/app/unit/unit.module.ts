import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUnitComponent } from './Components/add-unit/add-unit.component';
import { RouterModule, Routes } from '@angular/router';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { SelectDurationComponent } from './Components/add-unit/select-duration/select-duration.component';
import { UnitDetailsComponent } from './Components/unit-details/unit-details.component';
import { UnitBuildingComponent } from './Components/unit-building/unit-building.component';
import { UnitCardComponent } from '../Component/home-page/unit-card/unit-card.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppModule } from '../app.module';


const routes:Routes=[
  {path: 'add', component: AddUnitComponent,canActivate: [userAuthGGuard]},
  {path:'selectDuration', component: SelectDurationComponent},
  {path:'det/:id', component: UnitDetailsComponent},
  {path: 'Allunits/:cityonly', component: UnitBuildingComponent, title: 'Unit List'},
  {path: 'Allunits/:area/:unitType/:priceType/:government', component: UnitBuildingComponent, title: 'Unit List'},

];

@NgModule({
  declarations: [
    AddUnitComponent,
    SelectDurationComponent,
    UnitDetailsComponent,
    UnitBuildingComponent,


  ],
  imports: [

  CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    NgxPaginationModule,
    AppModule,
    MatCardModule,
    RouterModule.forChild(routes),





  ]
})
export class UnitModule { }
