import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


//Servicios
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { ApiSettigns } from 'src/app/API/API.settings';
import { BrandModel } from 'src/app/models/brand.model';
import { CategoryModel } from 'src/app/models/category.model';
import { DataServicesService } from 'src/app/services/data-services.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  form:FormGroup;
	loader:boolean = false;
	error:boolean = false;
  imagen : File;
  Product:ProductModel;
  url_image:string = ApiSettigns.url_image;
  listBrands:BrandModel[] = [];
  listCategories:CategoryModel[] = [];
  listOfferOcupied:Number[] = [];
  listBestOcupied:Number[] =[];
  caoruselOpcion:Number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(private router:Router,
              private activate:ActivatedRoute,
              private fb:FormBuilder,
              private _products:ProductsService,
              private _data:DataServicesService) {

    this.listBrands = this._data.listBrands;
    this.listCategories = this._data.listCategories;
    this.getOrderOfferDay();
    this.getOrderBestSeller();

  }

  ngOnInit(): void {
    this.id = this.activate.snapshot.params.id;
    this.getParam();
    this.crearFormulario();
    this.getProduct();
  }

  getParam(){

    /*
    Esta funcion obtine los parametros que se le pasa al componente
    atraves de la url.
    parameter:no hay.
    return : no hay.
    */

		this.activate.params
		.subscribe((params:Params) => {
			this.id = params.id;
		})
	}

  crearFormulario(){

    /*
      Esta funcion inicializa los campos que contralar el formulario.
      Cada campo tendra sus validaciones correspondiente
      parameter:no hay.
      return: no retorna nada
    */

    this.form =this.fb.group({
      product_image:[''],
      category_id:['',Validators.required],
      brand_id:['',Validators.required],
      product_name:['',Validators.required],
      product_description: ['', Validators.required],
      product_price:[0,Validators.required],
      product_stock:[1,Validators.required],
      product_offer_day:[0,Validators.required],
      product_best_seller:[0,Validators.required],
      product_offer_day_order:[0],
      product_best_seller_order:[0]
    });
  }

  getProduct(){

    /*
    Esta funcion obtiene los datos de un producto haciendo
    la peticion a  la API pasandole el id del producto. Luego pone los datos
    obtenidos en los campos del formulario.
    parameter:no hay.
    return:no retorna.
    */

    this._products.getProduct(this.id)
      .subscribe((resp:any) => {
        this.Product = new ProductModel(resp[0]);
        this.form.get('product_name').setValue(this.Product.product_name);
        this.form.get('product_description').setValue(this.Product.product_description);
        this.form.get('product_price').setValue(this.Product.product_price);
        this.form.get('product_stock').setValue(this.Product.product_stock);
        this.form.get('category_id').setValue(this.Product.category.category_id);
        this.form.get('brand_id').setValue(this.Product.brand.brand_id);
        this.form.get('product_offer_day').setValue(this.Product.product_offer_day);
        this.form.get('product_offer_day_order').setValue(this.Product.product_offer_day_order);
        this.form.get('product_best_seller').setValue(this.Product.product_best_seller);
        this.form.get('product_best_seller_order').setValue(this.Product.product_best_seller_order);
        if (!this.Product.product_best_seller) {
          this.form.get('product_best_seller_order').disable();
        }
        if (!this.Product.product_offer_day) {
          this.form.get('product_offer_day_order').disable();
        }
        this.url_image = this.url_image + this.Product.product_image.substring(8);

      }, (error:any) => {
          console.log(error);

      })
  }

  goGrid(){

    /*
    Esta funcion te redireciona a la vista del datatble de productos
    paremeter:no hay.
    return: no hay.
    */

    this.router.navigateByUrl('dashboardProducts');
  }

  get categoryNoValida(){

    /*
    Esta funcion es validar si el campo category_id es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

      return this.form.get('category_id').invalid && this.form.get('category_id').touched ;
  }

  get brandNoValida(){

    /*
    Esta funcion es validar si el campo brand_id es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('brand_id').invalid && this.form.get('brand_id').touched ;
  }

  get imageNoValido(){

    /*
    Esta funcion es validar si el campo product_image es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_image').invalid && this.form.get('product_image').touched ;
  }

  get nameNoValido(){

    /*
    Esta funcion es validar si el campo product_name es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_name').invalid && this.form.get('product_name').touched ;
  }

  get descriptionNoValido(){

    /*
    Esta funcion es validar si el campo product_description es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

     return this.form.get('product_description').invalid && this.form.get('product_description').touched ;
  }

  get precioNoValido(){

    /*
    Esta funcion es validar si el campo product_price es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_price').invalid && this.form.get('product_price').touched ;
  }

  get stockNoValido(){

    /*
    Esta funcion es validar si el campo product_stock es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_stock').invalid && this.form.get('product_stock').touched ;
  }

  get offerNoValido(){

    /*
    Esta funcion es validar si el campo product_offer_day es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_offer_day').invalid && this.form.get('product_offer_day').touched ;
  }

  get bestNoValido(){

    /*
    Esta funcion es validar si el campo product_best_seller es
    invalido y si fue touchead(tocado)
    parameter: no hay.
    return: un booleano.
    */

    return this.form.get('product_best_seller').invalid && this.form.get('product_best_seller ').touched ;
  }

  selectFile(event:any){

    /*
    Esta funcion lo que hace es poner la imagen selecionada
    en el recuadro blanco.
    parameter: evento
    return: no hay.
    */

    if(event.target.files){
      var reader =new FileReader();
      const file = event.target.files[0];
      this.imagen = file;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) => {
        this.url_image = event.target.result;
      }
    }
  }

  changeOffer(){

    /*
    Esta funcion cambia a desabilitado el campo de orden de carousel
    para el producto oferta del dia si no es  oferta del dia.
    Y habilita el carousel cuando es orden del dia
    parameter:no hay.
    return:no hay
    */

    if (this.form.get('product_offer_day').value == 0){
      this.form.get('product_offer_day_order').setValue(0);
      this.form.get('product_offer_day_order').disable();
    }else{
      this.form.get('product_offer_day_order').enable();
    }

  }

  changeBest(){

    /*
    Esta funcion cambia a desabilitado el campo de orden de carousel
    para el producto destacado si no es  destacado. Y habilita el carousel
    cuando es destacado
    parameter:no hay.
    return:no hay
    */

    if (this.form.get('product_best_seller').value == 0){
      this.form.get('product_best_seller_order').setValue(0);
      this.form.get('product_best_seller_order').disable();
    }else{
      this.form.get('product_best_seller_order').enable();
    }
  }


  getOrderOfferDay(){

    /*
    Esta funcion obtiene la respuesta de la APi para obtrener
    el listado de las orden de los productos que son oferta del dia.
    parameter: mp hay.
    return: no hay.
    */

    this._products.getOrderOfferDay()
      .subscribe((resp:any) =>{
        resp.forEach(element => {
            this.listOfferOcupied.push(element.product_offer_day_order);
        });

      },(error:any)=>{
        console.log(error);

      });
  }

  getOrderBestSeller(){

    /*
    Esta funcion obtiene la respuesta de la APi para obtrener
    el listado de las orden de los productos que son destacados.
    parameter: mp hay.
    return: no hay.
    */

    this._products.getOrderBestSeller()
      .subscribe((resp:any)=>{
        resp.forEach(element => {
          this.listBestOcupied.push(element.product_best_seller_order);
        });
      },(error:any)=>{
        console.log(error);

      })
  }

  actualizarValores(item:number){

    /*
    Esta funcion estaba pensada para que
    si el valor es 1 devuelva true y 0 caso contrario*/

    if(item == 1){
      return 1;
    }else{
      return 0;
    }
  }

  update(){

    /*
    Esta funcion modifica los datos de un producto , haciendo consumo de la
    api para ello.
    parameter: no hay.
    return: no hay.
    */

    this.error = false;
    this.loader = true;
    if( this.form.invalid){
      this.loader = false;
      return Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
      })
    };
    this.form.get('product_stock')
      .setValue(this.actualizarValores(
        this.form.get('product_stock').value)
      );

    this.form.get('product_best_seller')
      .setValue(this.actualizarValores(
        this.form.get('product_best_seller').value)
      );

    this.form.get('product_offer_day')
      .setValue(this.actualizarValores(
        this.form.get('product_offer_day').value)
      );

      const data = new FormData();
      data.append('product_name',
                  this.form.get('product_name').value
                );

      data.append('product_description',
                  this.form.get('product_description').value
                );

      data.append('brand_id',
                  this.form.get('brand_id').value
                );
      data.append('category_id',
                  this.form.get('category_id').value
                );

      data.append('product_price',
                  this.form.get('product_price').value
                );

      data.append('product_image',
                  this.imagen
                );
      data.append('product_stock',
                  this.form.get('product_stock').value
                );
      data.append('product_best_seller',
                  this.form.get('product_best_seller').value
                );
      data.append('product_offer_day',
                  this.form.get('product_offer_day').value);

      data.append('product_best_seller_order',
                  this.form.get('product_best_seller_order').value);

      data.append('product_offer_day_order',
                  this.form.get('product_offer_day_order').value);

      this._products.updateProduct(this.id,data)
        .subscribe((resp:any) => {

            this.loader = false;
            this.goGrid();
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
              title: 'Se modifico el producto con exito'
            })
        }, (error:any) => {
          this.loader = false;
          this.error = true;
          console.log(error);

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
            icon: 'error',
            title: error.error.message
          })
        });

  }

}
