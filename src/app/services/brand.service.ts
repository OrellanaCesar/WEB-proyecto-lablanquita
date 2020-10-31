import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import {DataTablesResponse} from 'src/app/models/dataTable.model';
import { ApiSettigns } from 'src/app/API/API.settings';


@Injectable({
	providedIn: 'root'
})
export class BrandService {

	constructor(private http:HttpClient) { }

	getBrands(){
		return this.http.get(`${ApiSettigns.url}brands`);
	}

	getBrand(id:number){
		return this.http.get(`${ApiSettigns.url}brands/${id}`)
	}

	createBrand(data:FormData){
		const headers = {
			'Accept': 'application/json'
		};
		return this.http.post(`${ApiSettigns.url}brands/create`, data, {headers});
	}

	deleteBrand(id:number){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.delete(`${ApiSettigns.url}brands/delete/${id}`, { headers });
	}

	updateBrand(id:number,data:FormData){
		const headers = {
			'Accept': 'application/json'
		}
		return this.http.post(`${ApiSettigns.url}brands/update/${id}`, data , { headers });
	}


	getDataTable(data:any){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.post<DataTablesResponse>(`${ApiSettigns.url}brands/dataTable`,data,
			{ headers });
	}

	searchProducts(id:number){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.get(`${ApiSettigns.url}brands/searchProducts/${id}`, { headers });
	}
}
