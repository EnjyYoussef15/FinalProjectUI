import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/unit/Models/unit';
import { UnitService } from 'src/app/unit/Services/unit.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{
  city:City[]=[];
  pCity:number=1;
  itemsPerPageCity:number=3;
  totalItemsCity:any;

  constructor(private services:UnitService){}
ngOnInit(): void {
  this.getCitiesComponent();
}

getCitiesComponent(){
this.services.getCities().subscribe({
  next:(value)=>{
    this.city=value;
    console.log("City",this.city);
this.totalItemsCity=this.city.length;
  }
});
}
}
