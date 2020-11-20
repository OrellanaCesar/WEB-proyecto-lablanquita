import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiSettigns } from 'src/app/API/API.settings';
//import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.css']
})
export class ModifyCategoryComponent implements OnInit {

  category:CategoryModel;
  id:number;
  form: FormGroup;
  loader:boolean = false;
  error:boolean = false;

  constructor(
              private routerA: ActivatedRoute,
              private _categories: CategoryService,
              private router:Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.routerA.snapshot.params.id;
    this.getParam();
    this.createForm();
    this.showCategory();
  }


  getParam(){
    /*Esta función obtiene el parámetro id que trae de la URL
      Parámetros: no tiene*/
    this.routerA.params
      .subscribe((params:Params) => {
        this.id = params.id;
      })
  }



  goGrid(){
    /*Busca la ruta en app-routing que me llevará al componente
      DataTableCategoryComponent
	    Parámetros: no hay */
    this.router.navigateByUrl('/dashboardCategory')
  }

  get InvalidName(){
    /*Verifica si el nombre de la categoría sea válido*/
    return this.form.get('category_name').invalid ;
  }

  showCategory(){
    /*LLama a la función del servicio de categoría (category.service->showCategory)
    para que en el Formulario muestre nos datos de ésta categoría(nombre enn este caso)
    Parámetros: no recibe*/
    this._categories.showCategory(this.id)
    .subscribe((resp:any) => {
      let category = new CategoryModel(resp);
      this.form.get('category_name').setValue(category.category_name);

    },
    (error:any) => {
      this.form.get('category_name').setValue('');
      console.log(error);
    })
  }

  update(){
    /* Modifica los datos de la categoría que fueron ingresados en el Formulario (data)
    Parámetros: no recibe
    Retorna: Mensaje indicando si se modificó o no la categoría*/

		this.error = false;
		this.loader = true;
		if( this.form.invalid){
			this.loader = false;
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			})

		}
		const data = new FormData();
		data.append('category_name',this.form.get('category_name').value );

		this._categories.updateCategory(this.id,data)
		.subscribe((resp) => {
			this.loader = false;
      this.goGrid();

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
        title: 'Se modificó la categoría con éxito'
      });

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

		this.form =this.fb.group({
			category_name:['',Validators.required]

		});
	}

}
