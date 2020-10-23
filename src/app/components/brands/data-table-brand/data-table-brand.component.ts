import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from 'src/app/models/brand.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-data-table-brand',
	templateUrl: './data-table-brand.component.html',
	styleUrls: ['./data-table-brand.component.css']
})
export class DataTableBrandComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	Brands: any[] = [];
	listBrands : BrandModel [] = [];
	constructor(private _brands:BrandService,
		private router:Router) { 
	}

	ngOnInit(): void {
		const that = this;
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			serverSide:true,
			processing: true,

			ajax:(dataTablesParameters :any,callback) => {
				that._brands.getDataTable(dataTablesParameters)
				.subscribe(resp => {
					that.Brands = resp.data;
					callback({
						recordsTotal: resp.recordsTotal,
						recordsFiltered: resp.recordsFiltered,
						data : []
					})
				})
			},
			columns: [{data:'brand_id'},{data: 'brand_name'},{data: 'action'}],
			responsive:true,
		};
	}

	createBrand(){
		this.router.navigateByUrl('createBrand');
	}

	deleteBrand(id:number){
		this._brands.deleteBrand(id)
		.subscribe((resp:any) => {
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
				icon: 'success',
				title: 'Se elimino la marca con exito'
			});
			this._brands.getBrands()
			.subscribe((resp:any) => {
				this.Brands = resp;
				this.listBrands = [];
				resp.forEach(element => {
					let brand = new BrandModel(element);
					this.listBrands.push(brand);
				});
			},error =>{
				console.log(error);
			})
		}
		,(error:any) => {
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
			});
		})
	}

}
