import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import {DataTablesResponse} from 'src/app/models/dataTable.model';
import { ApiSettigns } from 'src/app/API/API.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {

   }
  
  getCategories(){

    /*esta función envia una peticion get a la API 
    obteniendo los datos de categoría.
     Parámetros: no recibe.
     Retorna: una promesa que será evaluada por el componente apropiado
    */

      return this.http.get(`${ApiSettigns.url}categories`);
  }

  dataTableCategories(data:any){

    /*esta función envia una peticion post a la API 
    obteniendo los datos de categoría para el manejo
    del datatable.
     Parámetros: 'data', la búsqueda que se hace en la grilla.
     Retorna: una promesa que será evaluada por el componente apropiado
    */

    const headers = {
			"Accept" : "application/json"
		};
		return this.http.post<DataTablesResponse>(`${ApiSettigns.url}categories/dataTable`,data,
			{ headers });
  }

  createCategory(data:FormData){
		const headers = {
			'Accept': 'application/json'
		};
		return this.http.post(`${ApiSettigns.url}categories/create`, data, {headers});
  }
  
  deleteCategory(id:number){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.delete(`${ApiSettigns.url}categories/delete/${id}`, { headers });
	}

	updateCategory(id:number,data:FormData){
		const headers = {
			'Accept': 'application/json'
		}
		return this.http.post(`${ApiSettigns.url}categories/update/${id}`, data , { headers });
	}
}
