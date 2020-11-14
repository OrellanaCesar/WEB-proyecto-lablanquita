import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiSettigns } from 'src/app/API/API.settings';
//import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  
  user:UserModel;
  id:number;
  form: FormGroup;
  loader:boolean = false;
  invalid:boolean;
  error:boolean = false;

  constructor(
              private routerA: ActivatedRoute,
              private _users: AuthService,
              private router:Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.routerA.snapshot.params.id;
    this.getParam();
    this.createForm();
    this.showUser();
  }

  getParam(){
    /*Esta función obtiene el parámetro id que trae de la URL
      Parámetros: no tiene*/ 
    this.routerA.params
      .subscribe((params:Params) => {
        this.id = params.id;
      })
  }
  
 

  goHome(){
    /*Busca la ruta en app-routing que me llevará al inicio
	    Parámetros: no hay */
    this.router.navigateByUrl('');
  }

  get nameNoValido(){
    /*Verifica si el nombre del usuario sea válido*/
    return this.form.get('user_name').invalid && this.form.get('user_name').touched ;
  }

  get emailNoValido(){
    return this.form.get('user_email').invalid && this.form.get('user_email').touched ;
  }

  get passwordNoValido(){
    return this.form.get('user_password').invalid && this.form.get('user_password').touched ;
  }

  get confirmationNoValido(){
    return this.form.get('user_password_confirmation').invalid && this.form.get('user_password_confirmation').touched  ;
  }

  showUser(){
    /*LLama a la función del auth.service (auth.service->user)
    para que en el Formulario muestre los datos de éste usuario(nombre e email en este caso)
    Parámetros: no recibe*/ 
    this._users.user()
    .subscribe((resp:any) => {
      console.log(resp);
      this.form.get('user_name').setValue(resp.user_name);
      this.form.get('user_email').setValue(resp.user_email);
        
    },
    (error:any) => {
      this.form.get('user_name').setValue('');
      this.form.get('user_email').setValue('');
      console.log(error);
    })
  }

  update(){
    /* Modifica los datos del usuario que fueron ingresados en el Formulario (data)
    Parámetros: no recibe
    Retorna: Mensaje indicando si se modificaron o no los datos del usuario*/

		this.error = false;
		this.loader = true;
		if( this.form.invalid){
			this.loader = false;
			return Object.values(this.form.controls).forEach(control => {
				control.markAsTouched();
			})

    }
    
		const data = {
      user_name : this.form.get('user_name').value,
      user_email : this.form.get('user_email').value,
      user_password : this.form.get('user_password').value,
      user_password_confirmation : this.form.get('user_password_confirmation').value
    } ;
		console.log(data);

		this._users.updateUser(data)
		.subscribe((resp) => {
			console.log(resp);
			this.loader = false;
      this.goHome();
      
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
        title: 'Los datos del usuario se modificaron con éxito!'
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
      user_name:['',Validators.required],
      user_email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_password:['',Validators.required],
      user_password_confirmation:['',Validators.required]

		});
	}


}
