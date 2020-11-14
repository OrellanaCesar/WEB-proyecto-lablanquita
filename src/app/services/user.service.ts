import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import {DataTablesResponse} from 'src/app/models/dataTable.model';


import { ApiSettigns } from 'src/app/API/API.settings';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http:HttpClient) { }

	getDataTable(data:any){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.post<DataTablesResponse>(`${ApiSettigns.url}users/dataTable`,data,
			{ headers });
	}

	getUsers(){
		return this.http.get(`${ApiSettigns.url}users`)
	}

	deleteUser(id:number){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.delete(`${ApiSettigns.url}users/delete/${id}`, { headers });
	}

	createUser(data:FormData){
		const headers = {
			'Accept': 'application/json'
		};
		return this.http.post(`${ApiSettigns.url}auth/signupAdministrador`, data, {headers});
	}
}
