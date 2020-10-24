import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { ApiSettigns } from 'src/app/API/API.settings';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {

  }

  getProducts(){

    /*Esta funcion realizara la peticion a la API para
    obtener todo los productos que hay ne la base de datos.
    parameter: no hay.
    return: retorna una promesa de la peticion que sera evaluada
        en el componente apropiado
    */

    return this.http.get(`${ApiSettigns.url}products`);
  }

  getProductsOfferDay(){

    /*Esta funcion realizara la peticion a la API para
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

  getProductsBestSeller(){

    /*Esta funcion realizara la peticion a la API para
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


}
