import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

// servicios
import { ProductsService } from 'src/app/services/products.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';

// Models
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  id:any;
  tipo:number;
  search:string;
  listProducts: ProductModel[] = [];
  data:FormData;
  loader:boolean = true;
  tam:boolean = false;


  constructor(private router:Router,
              private activate:ActivatedRoute,
              private _products:ProductsService,
              private _brands:BrandService,
              private _categories:CategoryService) {

        this.getParam();

    }

  ngOnInit(): void {
  }

  getParam(){

    /*
    Esta funcion obtine los parametros que se le pasa al componente
    atraves de la url.
    parameter:no hay.
    return : no hay.
    */
    this.id = this.activate.snapshot.params.id;
    this.tipo = this.activate.snapshot.params.tipo;
    this.search = this.activate.snapshot.params.valor;
		this.activate.params
		.subscribe((params:Params) => {
			this.id = params.id;
      this.tipo = params.tipo;
      this.search = params.valor;
      console.log(this.id,this.tipo,this.search);
      this.creaData();
      this.loader = true;
      this.getProducts();
		})
	}

  getProducts(){

    if(this.tipo == 1){
      this._brands.searchProducts(this.id)
        .subscribe((resp:any) => {
          this.listProducts = [];
          if(resp.length == undefined){
            this.listProducts.push(resp);
            this.loader = false;
          }else{
            resp.forEach(element => {
              let prod = new ProductModel(element);
              this.listProducts.push(prod);
            });
            this.loader = false;

          }


        },(error) => {
          this.listProducts = [];
          this.loader = false;
        })

    }else{
      if (this.tipo == 2) {
          this._categories.searchProducts(this.id)
            .subscribe((resp:any) => {
              this.listProducts = [];
              if(resp.length == undefined){
                this.listProducts.push(resp);
                this.loader= false;
              }else{
                resp.forEach(element => {
                  let prod = new ProductModel(element);
                  this.listProducts.push(prod);
                });
                this.loader = false;

              }

            },(error:any) => {
              this.listProducts = [];
              this.loader = false;
            })

      }else {
        this._products.searchProduct(this.data)
          .subscribe((resp:any) => {
            console.log(resp);

            this.listProducts = [];
            resp.forEach(element => {
              let prod = new ProductModel(element);
              this.listProducts.push(prod);
            });
            this.loader = false;

          },(error:any) => {
            this.listProducts = [];
            this.loader = false;

          })

      }
    }
  }

  creaData(){
    this.data = new FormData();
    if (this.tipo == 3){
      this.data.append('product_name',this.search);
      this.data.append('product_description',this.search);
      this.data.append('brand_name', this.search);
      this.data.append('category_name',this.search);
    }

  }



}
