import { Component, OnInit } from '@angular/core';
import { Offer } from '../../Models/offer';
import { OffersService } from '../../Services/offers.service';
import { Chat, UsersFire } from 'src/app/chat/Models/chat';
import { ChatService } from 'src/app/chat/Services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{
  users:UsersFire[] = [];
  offers: Offer[] = [];
  ngOnInit(): void {
this.getUsersFromFirebase().then(()=>{
  this.getOffers();
});
  }
   constructor(private offerService: OffersService,private router:Router,private chatServices:ChatService) { }

   getOffers(){
    this.offerService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
        console.log("Offers",offers);

      },
      error: (error) => {
        console.log(error);
      }
    });
   }

   AddUserToFirebaseComponenet(offer:Offer){

    for (let index = 0; index < this.users.length; index++) {
      console.log("In Loop Users ID ", this.users[index].UserID);
      console.log("In Loop Users ID ", offer.buyerID);
       if(this.users[index].UserID==offer.buyerID){
        console.log("This user is already registered");
        this.sendMessage(offer);
       return;
      }
    }
    console.log("This user is Not registered");
       this.chatServices.addUser(offer.buyerID).then(()=>{
        this.sendMessage(offer);
       });
  }

  async getUsersFromFirebase(){
    this.chatServices.getUsers().subscribe({
      next:(value)=>{
       value.map((e:any)=>{
         this.users.push( e.payload.doc.data());
        });
      }
    });
  }


   sendMessage(offer: Offer) {
    const chat:Chat={
      recieverID: offer.buyerID,
      dateTime:new Date,
      senderID: offer.ownerID,
      message:'مرحبا يرجي التواصل لاتمام التعاقد'
    }
    this.chatServices.sendMessage(chat).then(()=>{
      this.router.navigate(['chat/chat/'+offer.buyerID]);
    });
  }

    deleteOffer(offerId: number): void {
      this.offerService.deleteOffer(offerId).subscribe({
        next: () => {
          this.offers = this.offers.filter((offer) => offer.id !== offerId);
          console.log('Offer deleted successfully');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

}







