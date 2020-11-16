import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { ApiSettigns } from 'src/app/API/API.settings';
import { HostListener } from "@angular/core";
@Component({
	selector: 'app-show-product',
	templateUrl: './show-product.component.html',
	styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
	scrHeight:any;
	scrWidth:any;
	@HostListener('window:resize', ['$event'])
	getScreenSize(event?) {
		this.scrHeight = window.innerHeight;
		this.scrWidth = window.innerWidth;
	}
	id:number;
	Product:ProductModel;
	url_image:string = ApiSettigns.url_image;
	description: string;
	loader:boolean = false;
	constructor( private rutaActiva: ActivatedRoute,
		private _products:ProductsService) {
		this.getScreenSize();
	}

	ngOnInit(): void {
		this.getId();
		this.getProduct();
	}

	getId(){
		this.id = this.rutaActiva.snapshot.params.id;
		this.rutaActiva.params.subscribe(
			(params : Params) => {
				this.id = params.id;
			}
			);
	}

	getProduct(){
		this.loader = true;

		this._products.getProduct(this.id)
		.subscribe( (resp:any) => {
			resp.forEach(element => {
				this.Product = new ProductModel(element);
			})
			this.loader = false;
			this.description = this.Product.product_description;
		},
		(error:any) => {
			this.loader = false;
			console.log(error)
		}
		)
	}

}
