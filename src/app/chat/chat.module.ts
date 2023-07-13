import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { userAuthGGuard } from '../user/Guird/user-auth-g.guard';
import { DatetimeFormatPipe } from './Pipes/datetime-format.pipe';
import { ReactiveFormsModule } from '@angular/forms';


const route:Routes=[{
  path: 'chat/:{id}', component: ChatComponent,canActivate:[userAuthGGuard]
}];

@NgModule({
  declarations: [
    ChatComponent,
    DatetimeFormatPipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class ChatModule { }
