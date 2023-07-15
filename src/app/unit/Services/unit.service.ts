import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Addunit } from '../Models/addunit';
import { Observable } from 'rxjs';
import { UpdateDuration } from '../Models/update-duration';
import { UnitCard } from '../Models/unit-card';
import { Favorites } from '../Models/favorites';
import { UnitDetails } from '../Models/unit-details';
import { City } from '../Models/unit';
import { UnitType } from '../Models/unit-type';
import { TypePrice } from '../Models/type-price';
import { ICategoryWithBuilding } from '../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  baseUrl:string="http://localhost:5219/api/";
  constructor(private http:HttpClient) { }
  AddUnit(unit:any){
    return this.http.post<any>(this.baseUrl+"Unit/addUnit/"+localStorage.getItem('token'),unit);
  }


      getGovernerateData()
    {
     return this.http.get<any[]>('assets/Data/GovernamentsData.json');
    }

    getMenuPrice(){
      return this.http.get<any[]>(this.baseUrl+"MenuPrice");
    }

    setDuration(updateDuration:UpdateDuration){
      return this.http.put<any>(this.baseUrl+"Unit/setDuration/"+localStorage.getItem('token'),updateDuration);
    }

    getAllUnits(pageNumber: number, pageSize: number):Observable<any>{

      const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      return this.http.get<UnitCard[]>(this.baseUrl+"Unit/getUnitsPagination",{params});
    }

    getFavorites(){
      return this.http.get<any[]>(this.baseUrl+"Favorite/getFavorites/"+localStorage.getItem('token'));
    }
    getAllFavorites(pageNumber:number,pageSize:number):Observable<any>{
      const params = new HttpParams()
      .set('userID',localStorage.getItem('token')!)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
      return this.http.get<any[]>(this.baseUrl+"Favorite/getAllFavoriteUnitsByUserID/",{params});
    }
    addFavorites(unitId:number){
      return this.http.post(this.baseUrl+"Favorite/"+localStorage.getItem('token'),unitId);
    }
    removeFavorites(unitId:number){
      return this.http.delete(this.baseUrl+"Favorite/"+localStorage.getItem('token')+"/"+unitId);
    }

    getUnitDetails(unitID:any){
      return this.http.get<UnitDetails>(this.baseUrl+"Unit/getUnit/"+unitID);
    }

    getCities()
    {
      return this.http.get<City[]>(this.baseUrl+"Unit/getCities");
    }

    getbySearch(area?:number,unittype?:UnitType,pricetype?:TypePrice,government?:string):Observable<UnitCard[]>
  {
    return this.http.get<UnitCard[]>(this.baseUrl+'Unit/search/'+area+'/'+unittype+'/'+pricetype+'/'+government)
  }

  getByCity(city:string)
  {
    return this.http.get<UnitCard[]>(this.baseUrl+'Unit/'+city);

  }
  getAllUnitsByCategory(Catid:number)
  {
    return this.http.get<ICategoryWithBuilding>('http://localhost:5219/api/category/'+Catid);
  }

  getCategory():Observable<any>
  {
    return this.http.get<any[]>("http://localhost:5219/api/category");
  }


}
