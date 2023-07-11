import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from './Services/home-page.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UIProject';
  userName:string = '';
  personalPhoto:any ;

  constructor(private router:Router,private services:HomePageService,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.services.geUsername().subscribe({
      next:(value)=> {
        this.userName=value.username;
        this.personalPhoto=this.sanitizer.bypassSecurityTrustUrl(value.personalPhoto);
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
    });  }
registerClick(){
  this.router.navigate(['/user/register'])
}

logout(){
  this.router.navigate(['']);
  localStorage.removeItem('token');
  console.log('token')
}

showChat:boolean=false;
clickHere(){
  this.showChat= !this.showChat;
}
closeChat(){
  this.showChat=false;
}
toAddUnit(){
  if(localStorage.getItem('token')){
    this.router.navigate(['/unit/add']);
  }
  else this.router.navigate(['/user/register'])
}
}



