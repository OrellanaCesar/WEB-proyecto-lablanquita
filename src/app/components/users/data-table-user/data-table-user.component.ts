import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {UserModel} from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-data-table-user',
	templateUrl: './data-table-user.component.html',
	styleUrls: ['./data-table-user.component.css']
})
export class DataTableUserComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	Users:any[] = [];
	listUser : UserModel [] = [];

	constructor(private router:Router,
		private _user:UserService) { }

	ngOnInit(): void {

		const that = this;
		this.dtOptions = {
			pagingType: 'full_numbers',
			pageLength: 10,
			serverSide:true,
			processing: true,

			ajax:(dataTablesParameters :any,callback) => {
				that._user.getDataTable(dataTablesParameters)
				.subscribe(resp => {

					// resp.data[0]['user_create_date'] = new Date(resp.data[0]['user_create_date']).toLocaleString();
					// resp.data[0]['user_change_date'] = new Date(resp.data[0]['user_change_date']).toLocaleString();
					that.Users = resp.data;
					that.Users.forEach(user => {
						user.user_create_date = new Date(user.user_create_date).toLocaleString();
						user.user_change_date = new Date(user.user_change_date).toLocaleString();
					});
					callback({
						recordsTotal: resp.recordsTotal,
						recordsFiltered: resp.recordsFiltered,
						data : []
					})
				}
				,(error:any) =>{
					this.Users = [];
					callback({
						recordsTotal: 0,
						recordsFiltered: 0,
						data : []
					})
					console.log(error);
				})
			},
			columns: [
			{
				data:'user_id'
			},
			{
				data: 'user_name'
			},
			{
				data: 'user_email'
			},
			{
				data: 'profile_name'
			},
			{
				data: 'user_create_date'
			},
			{
				data: 'user_change_date'
			},
			{
				data: 'action'
			}
			],
			responsive:true,
		};
	}


	deleteUser(id:number){
		/*Elimina la marca del identificador que pasa como parametro
		paramentro:id (identificador de la marca)*/
		this._user.deleteUser(id)
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
			this._user.getUsers()
			.subscribe((resp:any) => {
				this.Users = resp;
				this.listUser = [];
				resp.forEach(element => {
					let user = element;
					user.user_create_date = new Date(user.user_create_date).toLocaleString();
					user.user_change_date = new Date(user.user_change_date).toLocaleString();
					this.listUser.push(user);
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

	createUserAdmin(){
		this.router.navigateByUrl('createUserAdmin');
	}

}
