import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { ApiSettigns } from 'src/app/API/API.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listProduct_OfferDay: ProductModel [] = [];
  listProduct_BestSeller: ProductModel [] = [];

  url_image:string = ApiSettigns.url_image;

  // configuracion para el carousel de productos
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 800,
    navText: ['<i class="fas fa-angle-double-left fa-2x"></i>', '<i class="fas fa-angle-double-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      420: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      },
      1200: {
        items:3
      }
    },
    nav: true
  };

  constructor( private _productService: ProductsService) {
    this.getProductsOfferDay();
    this.getProductsBestSeller();
  }


  ngOnInit(): void {
  }

  getProductsOfferDay(){
    this._productService.getProductsOfferDay()
      .subscribe( (resp:any) =>{
        let i = 0;
        resp.forEach(element => {
          this.listProduct_OfferDay.push(new ProductModel(element));
        });
      },
      (error:any) => {
        this.listProduct_OfferDay = [];
      }
     )
  }

  getProductsBestSeller(){
    this._productService.getProductsBestSeller()
      .subscribe( (resp:any) =>{
        let i = 0;
        resp.forEach(element => {
          this.listProduct_BestSeller.push(new ProductModel(element));
        });

      },
      (error:any) => {
        this.listProduct_BestSeller = [];
      }
     )
  }

}
