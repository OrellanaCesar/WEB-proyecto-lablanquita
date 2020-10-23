import { Component, OnInit, HostListener } from '@angular/core';
import { BrandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  scrHeight:any;
  scrWidth:any;
  listBrands : BrandModel [] = [];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor( private _brand:BrandService,
    private router:Router) {
    this.getScreenSize();
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

}
