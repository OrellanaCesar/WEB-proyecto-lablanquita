import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {UserModel} from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { DataServicesService } from 'src/app/services/data-services.service';


@Component({
	selector: 'app-create-brand',
	templateUrl: './create-user-admin.component.html',
	styleUrls: ['./create-user-admin.component.css']
})
export class CreateUserAdminComponent implements OnInit {
	forma:FormGroup;
	loader:boolean = false;
	error:boolean = false;
	listUsers : UserModel [] = [];
	constructor(private router:Router,
		private fb:FormBuilder,
		private _user:UserService,
		private _data:DataServicesService) {
		this.createForm();
	}

	ngOnInit(): void {
	}

	createForm(){
		/*Crea el formulario para la marca */
		this.forma = this.fb.group({
			user_name:['',Validators.required],
			user_email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
			user_password:['',Validators.required],
			user_password_confirmation:['',Validators.required]
		});
	}

	goGrid(){
		/*Vuelve al Grid , a la tabla de marcas*/
		this.router.navigateByUrl('dashboardUsers');
	}

	get InvalidName(){
		/*Verifica si el nombre de la marca es valido*/
		return this.forma.get('user_name').invalid && this.forma.get('user_name').touched;
	}

	get Invalidemail(){
		/*Verifica si el nombre de la marca es valido*/
		return this.forma.get('user_email').invalid && this.forma.get('user_email').touched;
	}

	get InvalidPassword(){
		return this.forma.get('user_password').invalid && this.forma.get('user_password').touched;
	}

	get InvalidPasswordConfirmation(){
		return this.forma.get('user_password_confirmation').invalid && 
		this.forma.get('user_password_confirmation').touched;
	}

	loadUser(){
		this._user.getUsers()
		.subscribe((resp:any)=>{
			this._data.listUsers = [];
			resp.forEach(element => {
				let user = element;
				this._data.listUsers.push(user);
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
		if(this.forma.invalid){
			this.loader = false;
			return Object.values(this.forma.controls).forEach(control => {
				control.markAsTouched();
			})
		}
		const data = new FormData();
		data.append('user_name',this.forma.get('user_name').value);
		data.append('user_email',this.forma.get('user_email').value);
		data.append('user_password',this.forma.get('user_password').value);
		data.append('user_password_confirmation',this.forma.get('user_password_confirmation').value);
		this._user.createUser(data)
		.subscribe((resp:any) => {
			this.loader = false;
			this.forma.reset({
				user_name:'',
				user_email:'',
				user_password:'',
				user_password_confirmation:''
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
				title: 'Se registro el usuario con exito'
			});
			this.loadUser();
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

