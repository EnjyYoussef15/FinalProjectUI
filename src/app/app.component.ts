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
  isShowFooter:boolean=true;

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
  localStorage.removeItem('token');
   this.router.navigate(['/user/login']);
}



token:string|null = localStorage.getItem('token');



showFooter(){
  this.isShowFooter=true;
}
hideFooter(){
  this.isShowFooter=false;
}

toChat(){
  this.isShowFooter=false;
  this.router.navigate(['chat/chat/'+'#']);
  this.isShowFooter=false
}
}



