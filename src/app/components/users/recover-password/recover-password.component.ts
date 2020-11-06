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
  constructor(private fb:FormBuilder,
              private auht:AuthService
            ) {

     this.crearForm();
  }

  ngOnInit(): void {
  }

  get emailNoValido(){
    return this.formRecover.get('user_email').invalid && this.formRecover.get('user_email').touched && this.invalid;
  }

  crearForm(){
    this.formRecover =this.fb.group({
      user_email:['',Validators.required]
    })
  }

  recoverPass(){
    console.log("recuperando");

  }


}
