import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { Chat, Users, UsersFire } from '../../Models/chat';
import { FormControl, FormGroup } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  @ViewChild('chatContainer', { static: false })
  chatContainer!: ElementRef;

  usersFromFirebase:UsersFire[] = [];
  usersFromApi:Users[]=[];
  userHeader:Users={
    id:'',
    name:'',
    personalImage:''
  }
  chats:Chat[]=[];

  inputMessage:any={
    'inputChat':''
  };
  chatForm:FormGroup;

myID:string='';
  constructor(private chatServices:ChatService,private elementRef: ElementRef, private renderer: Renderer2){
    this.chatForm=new FormGroup({
      inputChat:new FormControl('')
    });
  }

 async ngOnInit(): Promise<void> {
  await this.getUsersFromFirebase();
this.myID=localStorage.getItem('token')!;

this.chatForm.valueChanges.subscribe({
  next:(emp)=>{
    this.inputMessage=emp;
  }
});

}


  async getUsersFromFirebase(){
    this.chatServices.getUsers().subscribe({
      next:(value)=>{
       value.map((e:any)=>{
         this.usersFromFirebase.push( e.payload.doc.data());
        });
    this.getUsersFromApi();
      }
    });
  }

  async getUsersFromApi(){
    const userIds: string[] = this.usersFromFirebase.map((user:UsersFire) => user.UserID);
    this.chatServices.getUserFromAPI(userIds).subscribe({
      next:(data)=>{
  this.usersFromApi=data;
      }
    });
  }

  selectUser(selectedUser:Users)
  {
    this.chats=[];
    this.userHeader=selectedUser;
    this.getChats(selectedUser.id);
    this.renderer.setProperty(this.elementRef.nativeElement.ownerDocument.defaultView, 'scrollTop', Number.MAX_SAFE_INTEGER);
    this.chatContainer.nativeElement.scrollTo({
      top: this.chatContainer.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  getChats(recieverID:string){
    this.chats=[];
    this.chatServices.getMessages(recieverID).subscribe({
      next:(value)=>{
        this.chats=[];
       value.map((e:any)=>{
         this.chats.push( e.payload.doc.data());
        });
          // Sort the chats array based on the dateTime property
      this.chats.sort((a: any, b: any) => {
        const dateTimeA = a.dateTime;
        const dateTimeB = b.dateTime;

        if (dateTimeA < dateTimeB) {
          return -1;
        } else if (dateTimeA > dateTimeB) {
          return 1;
        } else {
          return 0;
        }
      });

      console.log("Chats", this.chats);

      this.renderer.setProperty(this.elementRef.nativeElement.ownerDocument.defaultView, 'scrollTop', Number.MAX_SAFE_INTEGER);
      this.chatContainer.nativeElement.scrollTo({
        top: this.chatContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });

    }
    });
  }



  sendMessageCommand(){
    const chat:Chat={
      dateTime:new Date,
      message:this.inputMessage.inputChat,
      recieverID:this.userHeader.id,
      senderID:localStorage.getItem('token')!
    }
    console.log("Chat===>>",chat);

   this.chatServices.sendMessage(chat);
  }

}
