import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from './Services/home-page.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from './Services/Notifications/notifications.service';
import { NotificationID, Notifications } from './Component/home-page/NotificatioModel/notifications';

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
  notifications:Notifications[]=[];
  notificationsId:NotificationID[]=[];
  count:number=0;

  constructor(private notificationServices:NotificationsService,private router:Router,private services:HomePageService,private sanitizer: DomSanitizer){}
   ngOnInit() {
    this.getNotifications();

    this.services.geUsername().subscribe({
      next:(value)=> {
        this.userName=value.username;
        this.personalPhoto=this.sanitizer.bypassSecurityTrustUrl(value.personalPhoto);
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

showNotification:boolean=false;
toggileNotification(){
  this.showNotification=!this.showNotification;

}

 getNotifications(){
console.log("Begin Get Notificaions=====================>>>>>");

this.notificationServices.getNotification().subscribe({
  next: (value) => {
    this.notifications = [];
    this.count = 0;
    value.map((e: any) => {
      const documentData = e.payload.doc.data();
      const documentId = e.payload.doc.id; // Access the document ID

      this.notifications.push(documentData);
      this.notificationsId.push(documentId);

      if (!documentData.starus) {
        this.count++;
      }

      console.log("Notification ===>>> ", this.notifications);
      console.log("Notification Count ===>>> ", this.count);
    });
  }
});

}

}



