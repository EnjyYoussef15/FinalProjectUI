import { Component , OnInit ,OnDestroy, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitCard } from '../../Models/unit-card';
import { UnitType } from '../../Models/unit-type';
import { TypePrice } from '../../Models/type-price';
import { UnitService } from '../../Services/unit.service';
import { Favorites } from '../../Models/favorites';
import { City } from '../../Models/unit';
import { object } from '@angular/fire/database';





@Component({
  selector: 'app-unit-building',
  templateUrl: './unit-building.component.html',
  styleUrls: ['./unit-building.component.css']
})
export class UnitBuildingComponent implements OnInit ,OnDestroy {


@Input() government?: string;
@Input()  area?: number;
@Input()  category?: number;
@Input()  priceType?: TypePrice;
// @Input() cityonlyy?:string;
@Input() title?:string;



  // product?: UnitCard;

  UnitBuildBysearch :UnitCard[]=[];
  UnitBuildBycity :UnitCard[]=[];



  errorMessage:string ='';
  sub!:Subscription;// ! assertion operator not null
  constructor(private router : Router , private route :ActivatedRoute, private service:UnitService )
  {
    this.title="أحدث الوحدات";
  }

  // government?: string;
  // area?: number;
  // category?: number;
  // priceType?: TypePrice;
  cityonlyy?:string;

  pCard:number=1;
  itemsPerPageCard:number=4;
  totalItemsCard:any;
  favorites:Favorites[]=[];


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.government = params.get('government')!;
      this.area =Number( params.get('area'))!;
      this.category =Number( params.get('category'))!;
      this.priceType =Number( params.get('pricetype'))!; });


      this.service.getbySearch(this.area,this.category,this.priceType,this.government).subscribe
    ({ next : catogries => {
        this.UnitBuildBysearch=catogries;
        // this.UnitBuildBysearch.forEach(c=>{console.log( c.price)});
        // this.totalItemsCard=this.UnitBuildBysearch.length;
        console.log("search lenght", this.UnitBuildBysearch);
        console.log(this.UnitBuildBysearch.length);

        console.log("in search");
      },
      error : err => console.log(err)
    });
///////////////////////////////////////////////////////////////////////////////////////////


    this.route.paramMap.subscribe(param => {
      this.cityonlyy = param.get('cityonly')!;
    //  this.government = param.get('cityonly')!;
        console.log(this.cityonlyy);
    });
    console.log(this.cityonlyy);

    if(this.cityonlyy != null)
    this.service.getByCity(this.cityonlyy).subscribe
    ({
      next: (response) => {
        this.UnitBuildBycity = response;
    this.getCitiesComponent(this.cityonlyy);

        console.log(this.UnitBuildBycity.length);
                console.log("in city only");

      },
      error: err =>  console.log("error is"+err)

    });


  }

  city:City[]=[];
  onecity?:City;
  getCitiesComponent(s?: string){
  this.service.getCities().subscribe({
    next:(value)=>{
    this.city=value;
    this.onecity= this.city.find(m=>m.cityName==s);
    console.log("City", this.city.find(m=>m.cityName==s));
    console.log(this.onecity);
  }
});
}
//////////////////////////////////////////////////////////////////////
  pageName : string = "Catogry List";
  // list show
  showlis :boolean = false;
  // image show
  showImg :boolean = false;






  showImage(){
    this.showImg = !this.showImg;
  }
  limit = 4;

  showList(){
    this.limit += 4;
    // if(this.limit >= this.UnitBuildBysearch.length-1)
    // {
    //   this.showlis = !this.showlis;
    // }

    // window.scrollTo(0, 0);
  }


  onratclick(message:string):void
  {
    this.pageName = "Catogry List " + message;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadData(){
    if(this.UnitBuildBysearch.length < this.limit)
    {
      this.limit += 4;
    }
  }
  togleFavorites(id:number){
    if(this.checkFavorite(id)){
      this.favorites = this.favorites.filter(item => item.unitID !== id);
      this.service.removeFavorites(id).subscribe();
    }
    else{
      let favorite:Favorites ={
        unitID: id
      };
      this.favorites.push(favorite);
      this.service.addFavorites(id).subscribe();
    }
    }

    getFavorites(){
      this.service.getFavorites().subscribe({
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


  // currentPage = 1;
  // pageSize = 10;
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: any) {
  //   const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body, html = document.documentElement;
  //   const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
  //   const windowBottom = windowHeight + window.pageYOffset;

  //   if (windowBottom >= docHeight) {
  //     this.currentPage++;
  //     this.loadData();
  //   }
  // }
}
