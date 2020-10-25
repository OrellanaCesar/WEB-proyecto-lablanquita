import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-data-table-category',
  templateUrl: './data-table-category.component.html',
  styleUrls: ['./data-table-category.component.css']
})
export class DataTableCategoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
	Categories: any[] = [];
  listaCategory:CategoryModel[]=[];

  constructor(private _categories:CategoryService,private router:Router) {
    //this.getCategories();
    //this.getDataTables();
   }
  
  ngOnInit(): void {
    /*Crea el dataTable con sus campos*/
		const that = this;
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			serverSide:true,
			processing: true,

			ajax:(dataTablesParameters :any,callback) => {
				that._categories.dataTableCategories(dataTablesParameters)
				.subscribe(resp => {
					that.Categories = resp.data;
					callback({
						recordsTotal: resp.recordsTotal,
						recordsFiltered: resp.recordsFiltered,
						data : []
					})
        }
        ,(error:any) =>{
            console.log(error);
        })
			},
			columns: [{data:'category_id'},{data: 'category_name'},{data: 'action'}],
			responsive:true,
		};
  }


  createCategory(){
		/*Se va a la vista de crear una categoría
		Parametros:no hay
		*/
		this.router.navigateByUrl('createCategory');
	}

  deleteCategory(id:number){

		/*Elimina la categoría del identificador que pasa como parámetro
		 Parámentro: id (identificador de la categoría)*/
		this._categories.deleteCategory(id)
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
				title: 'Se eliminó la categoría con éxito'
			});
			this._categories.getCategories()
			.subscribe((resp:any) => {
				this.Categories = resp;
				this.listaCategory = [];
				resp.forEach(element => {
					let category = new CategoryModel(element);
					this.listaCategory.push(category);
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

	update(id:number){
		//this.router.navigateByUrl(`/updatebrand/${id}`);
	}

}
