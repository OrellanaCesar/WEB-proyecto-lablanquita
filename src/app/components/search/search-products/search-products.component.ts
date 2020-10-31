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

  id:number;
  tipo:number;
  search:string;
  listaProducts: ProductModel[] = [];

  constructor(private router:Router,
              private activate:ActivatedRoute,
              private _products:ProductsService,
              private _brands:BrandService,
              private _categories:CategoryService) { }

  ngOnInit(): void {
    this.id = this.activate.snapshot.params.id;
    this.tipo = this.activate.snapshot.params.tipo;
    this.search = this.activate.snapshot.params.valor;
    this.getParam();
  }

  getParam(){

    /*
    Esta funcion obtine los parametros que se le pasa al componente
    atraves de la url.
    parameter:no hay.
    return : no hay.
    */

		this.activate.params
		.subscribe((params:Params) => {
			this.id = params.id;
      this.tipo = params.tipo;
      this.search = params.valor;
		})
	}

  getProducts(){
    
  }



}
