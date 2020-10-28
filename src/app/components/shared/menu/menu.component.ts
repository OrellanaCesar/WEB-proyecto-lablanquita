import { Component, OnInit, HostListener } from '@angular/core';
import { BrandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../models/category.model';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  scrHeight:any;
  scrWidth:any;
  listBrands : BrandModel [] = [];
  listCategories : CategoryModel [] = [];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor( private _brand:BrandService,
               private router:Router,
               private _category:CategoryService,
               public _data:DataServicesService) {
    this.getScreenSize();
    this.getBrands();
    this.getCategories();
    this._data.listBrands = this.listBrands;
    this._data.listCategories = this.listCategories;
  }

  ngOnInit(): void {
  }

  buscarProducts(texto:String){
    console.log(texto);
  }

  getBrands(){
    this._brand.getBrands()
    .subscribe((resp:any) => {
      resp.forEach(element => {
        let brand = new BrandModel(element);
        this.listBrands.push(brand);
      });
    },
    (error:any) => {
      console.log(error);

    });
  }
  getCategories(){
    this._category.getCategories()
    .subscribe((resp:any) => {
      resp.forEach(element => {
        let category = new CategoryModel(element);
        this.listCategories.push(category);
      });
    },
    (error:any) => {
      console.log(error);

    });
  }

}
