import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import {DataTablesResponse} from 'src/app/models/dataTable.model';
import { ApiSettigns } from 'src/app/API/API.settings';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,
              private auth:AuthService) {

   }

  getCategories(){

    /*esta función envia una peticion get a la API
    obteniendo los datos de categoría.
     Parámetros: no recibe.
     Retorna: una promesa que será evaluada por el componente apropiado
    */

      return this.http.get(`${ApiSettigns.url}categories`);
  }

  getCategory(id:number){
    /*esta función envía una peticion get a la API
     obteniendo los datos de una categoría.
     Parámetros: id de categoría.
     Retorna: una promesa que será evaluada por el componente apropiado
    */
    return this.http.get(`${ApiSettigns.url}categories/${id}`)
  }

  dataTableCategories(data:any){

    /*esta función envia una peticion post a la API
    obteniendo los datos de categoría para el manejo
    del datatable.
     Parámetros: 'data', la búsqueda que se hace en la grilla.
     Retorna: una promesa que será evaluada por el componente apropiado
    */

    const headers = {
			"Accept" : "application/json",
      "Authorization" : `${this.auth.type_token} ${this.auth.user_token}`
		};
		return this.http.post<DataTablesResponse>(`${ApiSettigns.url}categories/dataTable`,data,
			{ headers });
  }

  createCategory(data:FormData){
    /*esta función envia una peticion POST a la API para crear una
    nueva categoría.
    Parámetros: data, los datos que trajo del formulario.
    Retorna: una promesa que será evaluada por el componente apropiado
    */
		const headers = {
			'Accept': 'application/json',
      "Authorization" : `${this.auth.type_token} ${this.auth.user_token}`
		};
		return this.http.post(`${ApiSettigns.url}categories/create`, data, {headers});
  }

  deleteCategory(id:number){
    /*esta función envía una peticion DELETE a la API para eliminar una
    categoría.
    Parámetros: id, de la categoría a eliminar.
    Retorna: una promesa que será evaluada por el componente apropiado
    */
		const headers = {
			"Accept" : "application/json",
      "Authorization" : `${this.auth.type_token} ${this.auth.user_token}`
		};
		return this.http.delete(`${ApiSettigns.url}categories/delete/${id}`, { headers });
	}

	updateCategory(id:number,data:FormData){
    /*esta función envía una peticion POST a la API para modificar
    datos de una  categoría.
    Parámetros: id, de la categoría a modificar.
                data, los datos que trajo del formulario.
    Retorna: una promesa que será evaluada por el componente apropiado
    */
		const headers = {
			'Accept': 'application/json',
      "Authorization" : `${this.auth.type_token} ${this.auth.user_token}`
		}
		return this.http.post(`${ApiSettigns.url}categories/update/${id}`, data , { headers });
  }

  showCategory(id:number){
    /*esta función envía una peticion GET a la API para traer los
    datos(nombre) de una categoría en particular.
    Parámetros: id, de la categoría a mostrar.
    Retorna: una promesa que será evaluada por el componente apropiado
    */
    const headers = {
			'Accept': 'application/json'
		}
    return this.http.get(`${ApiSettigns.url}categories/show/${id}`,{headers});
  }

  searchProducts(id:number){
		const headers = {
			"Accept" : "application/json"
		};
		return this.http.get(`${ApiSettigns.url}categories/searchProducts/${id}`, { headers });
	}
}
