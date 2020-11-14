import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DataServicesService } from 'src/app/services/data-services.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-users-clients',
  templateUrl: './users-clients.component.html',
  styleUrls: ['./users-clients.component.css']
})
export class UsersClientsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  clients:any[]= [];
  selected:boolean = false;
  mensaje:string;

  constructor(private auht:AuthService,
              private _users:UserService,
              private _data:DataServicesService,
              private router:Router) {

    this.auht.leerToken();
    this._data.sendMail = [];

  }

  ngOnInit(): void {

    /*
    Esta funcion obtiene los datos de usuarios clientes, haciendo puna peticion
    a  la API.
    parameter: no hay. Si bien la libreria DataTable realiza la busqueda, en el
    metodo ajax se pasa lo buscado.
    return: no hay.
    */
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide:true,
      processing: true,

      ajax:(dataTablesParameters :any,callback) => {
        that._users.getClients(dataTablesParameters)
        .subscribe(resp => {
          that.clients = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data : []
          })
        }
        ,(error:any) =>{
          this.clients = [];
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
          data: 'user_name'
        },
        {
          data: 'user_email'
        },
        {
          data: 'action'
        }
      ],
      responsive:true,
    };

  }

  check(event,id){

     /*
      Esta funcion marca o desmarca al checkbox.
      parameter: el evento del checkbox, y el id del usuario que esta asociado
      al checkbox.
      return : no hay.
     */

    $(`input:checkbox[id=${id}]`).attr('checked',event.target.checked);
  }

  allSelect(event){

    /*
    Esta funcion marca o desmarca todos los checkbox de todos los usuarios.
    parameter: evento del checkbox que selecciona todo.
    return: no hay.
    */

    this.clients.forEach(user => {
      $(`input:checkbox[id=${user.user_id}]`).prop('checked',event.target.checked);

    });

  }

  next(){

    /*
      Esta funcion se va a la pagina de selecionar
      el tipo de mail para enviarlo.
    */

    this.selected = false;
    let cont = 0;
    this.clients.forEach( user => {
      if($(`input:checkbox[id=${user.user_id}]`).is(':checked')){
        cont = cont + 1;
        this._data.sendMail.push(String($(`input:checkbox[id=${user.user_id}]`).val()));
      }
    });
    if( cont == 0){
      this.selected = true;
      this.mensaje = "Debe seleccionar al menos un cliente para poder enviar un email."
      return ;
    }

    this.router.navigateByUrl(`sendMailClients`);
  }





}
