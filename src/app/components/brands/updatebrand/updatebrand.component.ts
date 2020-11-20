import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from 'src/app/models/brand.model';
import { ApiSettigns } from 'src/app/API/API.settings';
import Swal from 'sweetalert2';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
	selector: 'app-updatebrand',
	templateUrl: './updatebrand.component.html',
	styleUrls: ['./updatebrand.component.css']
})
export class UpdatebrandComponent implements OnInit {
	id : number;
	brand :BrandModel ;
	loader:boolean = false;
	error:boolean = false;
	forma: FormGroup;
	listBrands: BrandModel [] = [];

	constructor(private router:Router,
							private routerA: ActivatedRoute,
							private _brand:BrandService,
							private _data:DataServicesService,
							private fb:FormBuilder) { }

	ngOnInit(): void {
		this.id = this.routerA.snapshot.params.id;
		this.getParam();
		this.createForm();
		this.getBrands();
	}

	getParam(){
		this.routerA.params
		.subscribe((params:Params) => {
			this.id = params.id;
		})
	}

	getBrands(){
		this._brand.getBrand(this.id)
		.subscribe((resp:any) => {
			this.brand = new BrandModel(resp[0]);
			this.forma.get('brand_name').setValue(this.brand.brand_name);

		},
		(error:any) => {
			console.log(error);
		})
	}

	goGrid(){
		/*Vuelve al Grid , a la tabla de marcas*/
		this.router.navigateByUrl('dashboardBrand');
	}

	get InvalidName(){
		/*Verifica si el nombre de la marca es valido*/
		return this.forma.get('brand_name').invalid ;
	}


	update(){

		this.error = false;
		this.loader = true;
		if( this.forma.invalid){
			this.loader = false;
			return Object.values(this.forma.controls).forEach(control => {
				control.markAsTouched();
			})

		}
		const data = new FormData();
		data.append('brand_name',this.forma.get('brand_name').value );


		this._brand.updateBrand(this.id,data)
		.subscribe((resp) => {
			this.Brands();
			this.loader = false;
			this.goGrid();

		},
		(error:any) => {
			this.loader = false;
			this.error = true;
			console.log(error);
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			Toast.fire({
				icon: 'error',
				title: error.error.message
			})
		})


	}

	volverValores(item:boolean){
		if (item){
			return 1;
		}else{
			return 0;
		}
	}

	actualizarValores(item:number){
		if(item ==1){
			return 1;
		}else{
			return 0;
		}
	}

	createForm(){

		this.forma =this.fb.group({
			brand_name:['',Validators.required]

		});
	}

	Brands(){

    /*
    Esta funcion obtiene todas las marcas para mostarlas en el menu.
    parameter:no hay.
    return:no hay.
    */

    this._brand.getBrands()
    .subscribe((resp:any) => {
      resp.forEach(element => {
        let brand = new BrandModel(element);
        this.listBrands.push(brand);
      });
			this._data.listBrands = this.listBrands;
    },
    (error:any) => {
      console.log(error);

    });
  }

}
