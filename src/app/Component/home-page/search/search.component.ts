import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TypePrice } from 'src/app/unit/Models/type-price';

import { UnitType } from 'src/app/unit/Models/unit-type';
import { UnitService } from 'src/app/unit/Services/unit.service';
import { map, startWith } from 'rxjs/operators';


import { animate, query, stagger, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit

{

  constructor(private services:UnitService,private router:Router){}

  city:string="";
  filteredOptions?: Observable<string[] |null>;
  cityselectedOption?:string;
  cityonlyy?:string;

  ngOnInit(): void
   {
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(""),
      map(value=> value!= null ? this._filter(value) : null ));

      this.getData();
      this.displayFn();
    }

onGovernorateChange(event:any): void
 {
      console.log("====SElectedGovernorate==" +event.target.value);
      const selected = this.jsonData.find(item => item.governorate_name_ar === event.target.value);
    }

      jsonData: any[]=[];
      getData() {
        this.services.getGovernerateData().subscribe({
          next:(value)=>{
            this.jsonData=value;
            console.log(this.jsonData);

          },
        });
      }

  cityControl= new FormControl<string|null>(null, Validators.required);


  private _filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();
    return this.jsonData.filter(option => option.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.cityselectedOption = event.option.value;
    this.cityonlyy=this.cityselectedOption;
    console.log(this.cityselectedOption);

  }

  selectFormControl = new FormControl('', Validators.required);

  UnitTypeselected?:number;
  UnitTypeselectedOption:any;

  unitControl = new FormControl<UnitType|null>(null, Validators.required);

  UnitTypes = [
    {value: UnitType.Sale, label: 'Sale'},
    {value: UnitType.Rent, label: 'Rent'},
  ];


  UnitPRICEselected?:number;
  UnitPRICEselectedOption:any;

  priceControl = new FormControl<TypePrice|null>(null, Validators.required);

  PriceTypes = [
    {value: TypePrice.Fixed, label: 'Fixed'},
    {value: TypePrice.Dynamic, label: 'Dynamic'},
  ];

  UnitAreaselected?:number;
  UnitAreaselectedOption?:any;

  areaControl = new FormControl<number|null>(null, Validators.required);
  area= [
    {value: 60, label: "م60 :80م"},
    {value: 80, label: "م80 :100م"},
    {value: 100, label: "م100 :120م"},
    {value: 120, label: "م120 :150م"},
    {value: 150, label: " اكثر من 150م"},

  ];
  UnitCityselected?:number;
  UnitCityselectedOption?:any;





  displayFn() {
    this.UnitTypeselectedOption = this.UnitTypes.find(animal => animal.value === this.UnitTypeselected)?.value;
    this.UnitPRICEselectedOption = this.PriceTypes.find(animal => animal.value === this.UnitPRICEselected)?.value;
    this.UnitAreaselectedOption = this.area.find(animal => animal.value === this.UnitAreaselected)?.value;

    console.log(this.UnitTypeselectedOption);
    console.log(this.UnitTypeselectedOption+"mm");

    console.log(this.UnitPRICEselectedOption);
    console.log(this.UnitAreaselectedOption);

  }

}
