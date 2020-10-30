import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { DataService } from 'src/app/services/data.service';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import Swal from 'sweetalert2';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  forma:FormGroup;
  loader:boolean = false;
  error:boolean = false;
  constructor(private router:Router,
              private fb:FormBuilder,
              private _category:CategoryService,
              private _data:DataServicesService
              ){
        this.createForm();
              }

  ngOnInit(): void {
  }

  createForm(){
    /*Crea el formulario para la categoría */
    this.forma = this.fb.group({
      category_name:['', Validators.required]
    });
  }

  goGrid(){
    /*Busca la ruta en app-routing que me llevará al componente DataTableCategoryComponent
	  Parámetros: no hay */
    this.router.navigateByUrl('dashboardCategory');
  }
  get nameNoValido(){
    /*Verifica si el nombre de la categoría sea válido*/
    return this.forma.get('category_name').invalid && this.forma.get('category_name').touched ;
  }

  toRegister(){
    /*Registra la categoría que se cargó en el formulario
		Parámetros:no hay
    Return: devuelve un mensaje indicando si se registró
    correctamente o no la Categoría*/
    this.error = false;
    this.loader = true;
    if( this.forma.invalid){
      this.loader = false;
      return Object.values(this.forma.controls).forEach(control => {
          control.markAsTouched();
      })

    }
    const data = new FormData();
    data.append('category_name', this.forma.get('category_name').value);
    this._category.createCategory(data)
      .subscribe((resp:any) =>{
        this.loader = false;
        this.forma.reset({
          category_name:''
        });
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
          title: 'Se registró la categoría con éxito'
        });
        this.loadCategory();
      },
    (error:any)=>{
      this.error = true;
      this.loader = false;
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

  loadCategory(){
    this._category.getCategories()
      .subscribe((resp:any)=>{
        this._data.listCategories = [];
        resp.forEach(element => {
          let category = new CategoryModel(element);
          this._data.listCategories.push(category);
        });
      },error=>{
        console.log(error);
      });
  }


}
