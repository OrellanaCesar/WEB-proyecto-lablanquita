import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServicesService } from 'src/app/services/data-services.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  form:FormGroup;
  loader:boolean = false;
  mails:any[] = [];
  types: any[] = [
    {
      id:0,
      tipo:'Enviar datos de todos los porductos.'
    },
    {
      id:1,
      tipo:'Enviar datos de los porductos que son ofertas del dia.'
    },
    {
      id:2,
      tipo:'Enviar datos de los porductos que son destacados.'
    }
  ];

  constructor( private router:Router,
               private fb:FormBuilder,
               private _data:DataServicesService,
               private _users:UserService) {

      this.crearFormulario();
      this.inicializaMails();

  }

  ngOnInit(): void {
  }

  crearFormulario(){

    /*
    Esta funcion crea el formulario para escoger que tipo de Email
    quiere enviar el usuairo administrador.
    parameter:no hay.
    return:nohat
    */

    this.form =this.fb.group({
      type_send: ['',Validators.required]
    });
  }

  get sendNoValida(){

    /*
    Esta funcion es validar si el campo type_send es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

      return this.form.get('type_send').invalid && this.form.get('type_send').touched ;
  }

  back(){

    /*
    Esta funcion Vuelve a la tabla de Usuarios Clientes.
    parameter: no hay.
    return: no hay.
    */

    this.router.navigateByUrl('clients');
  }

  inicializaMails(){
    for (let i = 0; i < this._data.sendMail.length; i++) {
      const element = {
        mail: this._data.sendMail[i],
        status: false
      };

      this.mails.push(element);


    }
  }

  sendMail(){

    /*
     Esta funcion envia mail a los email seleccionado en la pagina enterior.los
     datos que se envian dependeran el tipo de envio que seleciono el usuairo.
     parameter: no hay.
     return:no hay.
    */

    this.loader = true;
    if( this.form.invalid){
      this.loader = false;
      return Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
      })
    };
    this._data.sendMail.forEach(email => {
      const data = {
        user_email:email
      };
      let i = 0;
      let type = this.form.get('type_send').value;
      this._users.sendMailClients(data, type)
        .subscribe((resp:any) => {
          this.mails[i].status = true;

        },(error:any) => {
          console.log(error);

        });

    });
    this.loader = false;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'info',
      title: 'Se enviaron los emails'
    })




  }

}
