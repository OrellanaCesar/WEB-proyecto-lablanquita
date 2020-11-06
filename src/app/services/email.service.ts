import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { ApiSettigns } from '../API/API.settings';


@Injectable({
	providedIn: 'root'
})
export class EmailService {

	constructor(private http:HttpClient) { }

	sendMail(data:FormData){
		const headers = {
			"Accept" : "application/jason"
		};
		return this.http.post(`${ApiSettigns.url}contacto`,data,{headers});
	}
}
