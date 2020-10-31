import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { ApiSettigns } from 'src/app/API/API.settings';
import { DataTablesResponse } from '../models/dataTable.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {

  }

  getProducts(){

    /*
    Esta funcion realizara la peticion a la API para
    obtener todo los productos que hay ne la base de datos.
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
    en el componente apropiado
    */

    return this.http.get(`${ApiSettigns.url}products`);
  }

  getProductsD(){

    /*
    Esta funcion realizara la peticion a la API para
    obtener todo los productos que hay ne la base de datos.
    Para el manejo de DataTable.
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
    en el componente apropiado
    */

    return this.http.get(`${ApiSettigns.url}products/getProductsD`);
  }

  getProduct(id:number){

  /*
  Esta funcion la peticion a la API para obtener los datos de un
  producto determinado
  parametros: identificador del producto
  return : retorna una promesa de la peticion que sera evaluada en
  el componentte apropiado
  */

  return this.http.get(`${ApiSettigns.url}products/${id}`)

  }

  getProductsOfferDay(){

    /*
    Esta funcion realizara la peticion a la API para
    obtener todo los productos que son ofertas del dia alamcenado
    en la base de datos.
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
    en el componente apropiado
    */

    const headers = {
      'Accept': 'application/json'
    };
    return this.http.get(`${ApiSettigns.url}products/offerDay`,{headers});

  }

  getOrderOfferDay(){

    /*
    Esta funcion realiza la peticion a la API para obtener
    todas los product_offer_day_order de los productos del dia
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
    en el componente apropiado
    */

    const headers = {
      'Accept': 'application/json'
    };
    return this.http.get(`${ApiSettigns.url}products/order/ocupedOfferDay`,{headers});
  }

  getOrderBestSeller(){

    /*
    Esta funcion realiza la peticion a la API para obtener
    todas los product_best_seller_order de los productos destacados
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
    en el componente apropiado
    */

    const headers = {
      'Accept': 'application/json'
    };
    return this.http.get(`${ApiSettigns.url}products/order/ocupedBestSeller`,{headers});
  }

  getProductsBestSeller(){

    /*
    Esta funcion realizara la peticion a la API para
    obtener todo los productos que son mas vendidos o destacados alamcenado
    en la base de datos.
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
        en el componente apropiado
    */

    const headers = {
      'Accept': 'application/json'
    };
    return this.http.get(`${ApiSettigns.url}products/bestSeller`,{headers});

  }

  getDataTables(data:any){

    /*
    Esta funcion realiza la petion a la API, obteniendo los datos
    de los productos en formatos DataTables.
    parameter: filtro de busqueda.
    return: una promesa de la peticion al componente correscpondiente.
     */

    const headers = {
      "Accept" : "application/json"
    };
    return this.http.post<DataTablesResponse>(`${ApiSettigns.url}products/dataTable`,data,{ headers });
  }

  createProduct(data:FormData){

    /*
    Esta funcion crea un producto consumiendo un recurso de la API y pasandole
    los datos del nuevo producto a la API.
    parameter: un FormData donde tiene los datos del nuevo porducto.
    return:una promesa de la peticion al componente correspondiente.
    */

    const headers = {
      'Accept' : 'application/json'
    }
    return this.http.post(`${ApiSettigns.url}products/create`,data,{headers});
  }

  deleteProduct(id:number){

    /*
    Esta funcion elimina un producto consumineod un recurso de la API.
    parameter:id del producto a eliminar
    return: una promesa de la peticion al componente correspondiente.
    */
    const headers = {
      'Accept':'application/json'
    };
    return this.http.delete(`${ApiSettigns.url}products/delete/${id}`,{ headers });
  }

  updateProduct(id:number, data:FormData){
  /*
  Esta funcion modifica los datos un producto consumiendo un recurso de la API
  parameter: id del producto a modificar.
  return: una promesa de la peticion al componente correspondiente.
  */

    const headers = {
      'Accept' : 'application/json'
    };
    return this.http.post(`${ApiSettigns.url}products/update/${id}`, data ,{headers});

  }

  searchProduct(data:FormData, tipoBusqueda:number){

    const headers = {
      'Accept': 'application/json'
    };
    return this.http.post(`${ApiSettigns.url}products/searchProducts`,data,{ headers });

  }

}
