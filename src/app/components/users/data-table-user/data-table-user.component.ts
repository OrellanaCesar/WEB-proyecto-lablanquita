import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-data-table-user',
	templateUrl: './data-table-user.component.html',
	styleUrls: ['./data-table-user.component.css']
})
export class DataTableUserComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	Users:any[] = [];

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
					that.Users = resp.data;
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

}
