import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favorites } from 'src/app/unit/Models/favorites';
import { UnitCard } from 'src/app/unit/Models/unit-card';
import { UnitService } from 'src/app/unit/Services/unit.service';


const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({visibility: 'hidden' }), stagger('200ms', animate('100ms ease-out', style({visibility: 'visible' })))],
      { optional: true }
    ),
    // query(':leave',

    //   animate('10ms', style({ visibility: 'hidden' })),
    //   { optional: true}
    // )
  ])
]);

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.css']
})

export class UnitCardComponent implements OnInit{

  unitCard:UnitCard[]=[];
  favorites:Favorites[]=[];
  pCard:number=1;
  itemsPerPageCard:number=6;
  totalItemsCard:any;


  constructor(private services:UnitService,private router:Router){}
  ngOnInit(): void {
  this.getunitsComponent();
  this.getFavorites();

  }

  getunitsComponent(){
    this.services.getAllUnits().subscribe({
      next:(value)=> {
        this.unitCard=value;
        console.log(value);
console.log("UnitCard",this.unitCard);
this.totalItemsCard=this.unitCard.length;
      },
    });
  }

  togleFavorites(id:number){
if(this.checkFavorite(id)){
  this.favorites = this.favorites.filter(item => item.unitID !== id);
  this.services.removeFavorites(id).subscribe();
}
else{
  let favorite:Favorites ={
    unitID: id
  };
  this.favorites.push(favorite);
  this.services.addFavorites(id).subscribe();
}
}

getFavorites(){
  this.services.getFavorites().subscribe({
    next:(value)=> {
      this.favorites=value;
      console.log("Favorites==>> ",this.favorites);

    },
  });
}

checkFavorite(id:any):boolean{
  for (let index = 0; index < this.favorites.length; index++) {
    if(this.favorites[index].unitID==id){
          console.log("Favorites====> True ==");
          return true
    }
  }
  console.log("Favorites====> False ==");
  return false;
}



}
