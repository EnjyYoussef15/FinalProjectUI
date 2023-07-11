import { Component, OnInit } from '@angular/core';
import { Offer } from '../../Models/offer';
import { OffersService } from '../../Services/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit{
  offers: Offer[] = [];
  ngOnInit(): void {
this.getOffers();
  }
   constructor(private offerService: OffersService) { }

   getOffers(){
    this.offerService.getOffers().subscribe({
      next: (offers: Offer[]) => {
        this.offers = offers;
      },
      error: (error) => {
        console.log(error);
      }
    });
   }



   startChat(offer: Offer) {
    const ownerID = offer.ownerID;
    const buyerID = offer.buyerID;

    console.log(`Start chat between Owner: ${ownerID} and Buyer: ${buyerID}`);
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







