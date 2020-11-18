import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  formRecover :FormGroup;
  invalid: boolean = false;
  error:boolean = false;
  loader:boolean = false;
  mensaje:string = '';
  status:number;

  constructor(private fb:FormBuilder,
              private auht:AuthService
            ) {

     this.crearForm();
  }

  ngOnInit(): void {
  }

  get emailNoValido(){
    return this.formRecover.get('user_email').invalid && this.formRecover.get('user_email').touched ;
  }

  crearForm(){
    this.formRecover =this.fb.group({
      user_email:['',Validators.required]
    })
  }

  recoverPass(){
    this.error = false;
    this.loader = true;
    if( this.formRecover.invalid){
      this.loader = false;
      return Object.values(this.formRecover.controls).forEach(control => {
          control.markAsTouched();
      })
    };
    let email = this.formRecover.get('user_email').value;
    this.auht.recoverPass(email)
      .subscribe((resp:any) => {
        this.loader = false;
        this.mensaje = resp.message;
        this.status = resp.status;


      },(error:any) =>{
        console.log(error);
        this.loader = false;
        this.error = true;
        this.mensaje = error.error.message;
        this.status = error.error.status;

      })

  }


}
