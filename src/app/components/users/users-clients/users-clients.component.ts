import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-users-clients',
  templateUrl: './users-clients.component.html',
  styleUrls: ['./users-clients.component.css']
})
export class UsersClientsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  clients:any[]= [];
  // hidden:boolean = false;
  // all:boolean=false;
  constructor(private auht:AuthService,
              private _users:UserService) {

    this.auht.leerToken();

  }

  ngOnInit(): void {
    if (this.clients.length == 0) {
      console.log("estoy aca");

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
  }

  check(event,id){
    $(`input:checkbox[id=${id}]`).attr('checked',event.target.checked);
  }

  allSelect(event){
    this.clients.forEach(user => {
      $(`input:checkbox[id=${user.user_id}]`).prop('checked',event.target.checked);

    });

  }

  next(){


  }

  back(){

  }

  sendMail(){
    console.log("enviandoMail");

  }



}
