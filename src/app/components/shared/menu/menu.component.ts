import { Component, OnInit, HostListener } from '@angular/core';
import { BrandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryModel } from '../../../models/category.model';
import { DataServicesService } from 'src/app/services/data-services.service';
import { ProductModel } from 'src/app/models/product.model';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  letra:string = '';
  listString : string [] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  formSearch: FormGroup;
  formLogin:FormGroup;
  formSignup: FormGroup;
  scrHeight:any;
  scrWidth:any;
  listBrands : BrandModel [] = [];
  listCategories : CategoryModel [] = [];
  invalid: boolean;
  error:boolean = false;
  disabled:boolean = false;
  user: UserModel = new UserModel();

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor( private _brand:BrandService,
               private router:Router,
               private auth:AuthService,
               private _category:CategoryService,
               public _data:DataServicesService,
               private fb:FormBuilder) {
    this.getScreenSize();
    this.leerDatos();
    this.getBrands();
    this.getCategories();
    this._data.listBrands = this.listBrands;
    this._data.listCategories = this.listCategories;
    this.createFormSearch();
    this.createFormLogin();
    this.createFormSignup();

  }

  ngOnInit(): void {
  }


  getBrands(){

    /*
    Esta funcion obtiene todas las marcas para mostarlas en el menu.
    parameter:no hay.
    return:no hay.
    */

    this._brand.getBrands()
    .subscribe((resp:any) => {
      resp.forEach(element => {
        let brand = new BrandModel(element);
        this.listBrands.push(brand);
      });
    },
    (error:any) => {
      console.log(error);

    });
  }

  search(){
    this.searchProducts(0,3,this.formSearch.value.search);
  }

  createFormSearch(){

    /*
    Esta funcion crea el formulario para el buscador.
    parameter: no hay.
    return: no hay.
    */

    this.formSearch = this.fb.group({
      search:['']
    });
  }

  get emailNoValido(){
    return this.formLogin.get('user_email').invalid && this.formLogin.get('user_email').touched && this.invalid;
  }

  get passwordNoValido(){
    return this.formLogin.get('user_password').invalid && this.formLogin.get('user_password').touched && this.invalid;
  }

  get nameNoValido(){
    return this.formSignup.get('user_name').invalid && this.formSignup.get('user_name').touched && this.invalid;
  }

  get emailNoValidoSignup(){
    return this.formSignup.get('user_email').invalid && this.formSignup.get('user_email').touched && this.invalid;
  }

  get passwordNoValidoSignup(){
    return this.formSignup.get('user_password').invalid && this.formSignup.get('user_password').touched && this.invalid;
  }

  get confirmationNoValidoSignup(){
    return this.formSignup.get('user_password_confirmation').invalid && this.formSignup.get('user_password_confirmation').touched && this.invalid;
  }

  estaAutenticado(){
    return this.auth.isAuth();
  }

  isAuthAdmin(){
    if (this.auth.isAuth() && Number(localStorage.getItem('profile')) == 1){
      return true;
    }else{
      return false;
    }
  }

  createFormLogin(){

    /*
    Esta funcion crea el formulario para el login.
    parameter: no hay.
    return: no hay.
    */

    this.formLogin = this.fb.group({
      user_email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_password:['',Validators.required]
    });
  }

  createFormSignup(){

    /*
    Esta funcion crea el formulario para el Signup.
    parameter: no hay.
    return: no hay.
    */

    this.formSignup = this.fb.group({
      user_name:['',Validators.required],
      user_email:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_password:['',Validators.required],
      user_password_confirmation:['',Validators.required]
    });
  }

  getCategories(){

    /*
    Esta funcion obtiene todas las categorias para mostrarlas en el Menu
    parameter:no hay.
    return: no hay.
    */

    this._category.getCategories()
    .subscribe((resp:any) => {
      resp.forEach(element => {
        let category = new CategoryModel(element);
        this.listCategories.push(category);
      });
    },
    (error:any) => {
      console.log(error);

    });
  }

  searchProducts(id:number, tipo:number, valor:string){

    /*
    Esta funcion re direcciona a la pagina q mostrara todos los
    productos segun la forma que lo busco.
    parameter: id ya sea de la marca o categoria, valera 0 cuando lo este
    buscando por otra cosa. El tipo de busqueda, lo mismo q antes 1 si es por
    marcas, 2 si es por categorias y 3 por otr cosa. El valor es cuando buscas
    por otra cosa(nombre, descripcion , etc), sera valor vacio cuando tenga tipo
    1 o 2.
    */

    this.router.navigateByUrl(`search/${tipo}/${id}/${valor}`);
  }

  login(){
    this.disabled = true;
    this.error = false;
    this.invalid = true;
    if( this.formLogin.invalid){
      this.disabled = false;
      return Object.values(this.formLogin.controls).forEach(control => {
          control.markAsTouched();
      })
    }
    this.user.user_email = this.formLogin.value.user_email;
    this.user.user_password = this.formLogin.value.user_password;

    this.auth.login(this.user)
      .subscribe((resp:any) =>{
        console.log(resp);
        this.auth.guardarToken(resp.access_token, resp.token_type, resp.expires_at,resp.profile_id);
        this.userData();
        this.auth.leerToken();
      },(error:any) => {
        this.disabled = false;
        this.error = true;
        console.log(error);
      });
  }

  modal(){
    this.formLogin.setValue({
      'user_email':'',
      'user_password':''
    });
    this.invalid = false;
    this.error = false;
  }

  modalSignup(){
    this.formSignup.setValue({
      'user_name':'',
      'user_email':'',
      'user_password':'',
      'user_password_confirmation':''
    });
    this.invalid = false;
    this.error = false;
  }

  leerDatos(){

    if(this.estaAutenticado()){
      this.auth.leerToken();
      this.auth.user()
        .subscribe((resp:any) => {
          this.user.user_email = resp.user_email;
          this.user.user_name = resp.user_name;
          this.user.user_id = resp.user_id;
          this.user.profile_id = resp.profile_id;
          this.letra = this.user.user_name[0];
          this.letra.toLocaleLowerCase();
          if(!this.listString.includes(this.letra)){
            this.letra = String(Math.random() * ( 10 - 0 ) + 0);
          }
        })
    }
  }

  userData(){
    this.auth.user()
      .subscribe((resp:any) =>{
        let nombre:string;
        this.user.user_email = resp.user_email;
        this.user.user_name = resp.user_name;
        this.user.user_id = resp.user_id;
        this.user.profile_id = resp.profile_id;
        nombre = this.user.user_name;
        console.log(nombre.toLowerCase()[0]);
        this.letra = nombre.toLowerCase()[0];;
        console.log(this.letra);

        if(!this.listString.includes(this.letra)){
          this.letra = String(Math.trunc(Math.random() * ( 10 - 0 ) + 0));
        }
        // console.log(this.usuario);
        $('#botonModal').click();
        this.disabled = false;
      }, (err)=>{
        console.log(err);
      })
  }

  logout(){
    this.disabled = true;
    this.auth.logout()
      .subscribe((resp:any) => {
        localStorage.removeItem('token');
        localStorage.removeItem('type_token');
        localStorage.removeItem('expira');
        localStorage.removeItem('profile');
        this.disabled = false;

        this.router.navigateByUrl('');
      },(error:any) =>{
        this.disabled = false;
      })
  }

  signup(){
    console.log('registrando');
    this.disabled = true;
    this.error = false;
    this.invalid = true;
    if( this.formSignup.invalid){
      this.disabled = false;
      return Object.values(this.formSignup.controls).forEach(control => {
          control.markAsTouched();
      })
    }
    this.user.user_name = this.formSignup.value.user_name;
    this.user.user_email = this.formSignup.value.user_email;
    this.user.user_password = this.formSignup.value.user_password;
    this.user.user_password_confirmation = this.formSignup.value.user_password_confirmation;

    this.auth.signup(this.user)
      .subscribe((resp:any) =>{
        console.log(resp);
        $('#botonModalSignup').click();
        this.disabled = false;
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
          icon: 'success',
          title: 'Se registró el usuario con éxito'
        });
      },(error:any) => {
        this.disabled = false;
        this.error = true;
        console.log(error);
      });
  }

  goRecoverPass(){
    $('#botonModal').click();
    this.router.navigateByUrl('recoverPassword');
  }

  goUpdate(){
    $('#perfilModal').click();
    this.router.navigateByUrl('updateUser');
  }
}
