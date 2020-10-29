import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;

  constructor(private router:Router,
              private activate:ActivatedRoute,
              private _products:ProductsService) { }

  ngOnInit(): void {
    this.id = this.activate.snapshot.params.id;
		this.getParam();
  }

  getParam(){
		this.activate.params
		.subscribe((params:Params) => {
			this.id = params.id;
		})
	}

}
