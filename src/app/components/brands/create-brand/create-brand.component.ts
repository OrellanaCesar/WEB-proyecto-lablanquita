import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from 'src/app/models/brand.model';
import Swal from 'sweetalert2';
import { DataServicesService } from 'src/app/services/data-services.service';


@Component({
	selector: 'app-create-brand',
	templateUrl: './create-brand.component.html',
	styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
	form:FormGroup;
	loader:boolean = false;
	error:boolean = false;
	// listBrands : BrandModel [] = [];
	constructor(private router:Router,
		private fb:FormBuilder,
		private _brand:BrandService,
		private _data:DataServicesService) {
		this.createForm();
	}

	ngOnInit(): void {
	}

	createForm(){
		/*Crea el formulario para la marca */
		this.form = this.fb.group({
			brand_name:['',Validators.required]
		})
	}

	goGrid(){
		/*Vuelve al Grid , a la tabla de marcas*/
		this.router.navigateByUrl('dashboardBrand');
	}

	get InvalidName(){
		/*Verifica si el nombre de la marca es valido*/
		return this.form.get('brand_name').invalid && this.form.get('brand_name').touched;
	}

	loadBrand(){
		this._brand.getBrands()
		.subscribe((resp:any)=>{
			this._data.listBrands = [];
			resp.forEach(element => {
				let brand = new BrandModel(element);
				this._data.listBrands.push(brand);
			});
		},error=>{
			console.log(error);
		});
	}

	register(){
		/*registra la marca que se cargo en el formulario
		parametros:no hay
		return: devuelve un mensaje si se registro correctamente o no*/
		this.error = false;
		this.loader = true;
		if(this.form.invalid){
			this.loader = false;
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			})
		}
		const data = new FormData();
		data.append('brand_name',this.form.get('brand_name').value);
		this._brand.createBrand(data)
		.subscribe((resp:any) => {
			this.loader = false;
			this.form.reset({
				brand_name:''
			});
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter',Swal.stopTimer)
					toast.addEventListener('mouseenter',Swal.resumeTimer)
				}
			})
			Toast.fire({
				icon: 'success',
				title: 'Se registro la marca con exito'
			});
			this.loadBrand();
		},
		(error:any) => {
			this.error = true;
			this.loader = false;
			const Toast = Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton : false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter',Swal.stopTimer)
					toast.addEventListener('mouseenter',Swal.resumeTimer)
				}
			})
			Toast.fire({
				icon : 'error',
				title: error.error.message
			});
		})
	}

}
