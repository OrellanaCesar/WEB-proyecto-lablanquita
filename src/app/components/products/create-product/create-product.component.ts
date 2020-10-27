import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { BrandModel } from 'src/app/models/brand.model';
import { CategoryModel } from 'src/app/models/category.model';




@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  form:FormGroup;
	loader:boolean = false;
	error:boolean = false;
  imagen : File;
  url_image:string = '';
  listBrands:BrandModel[] = [];
  listCategories:CategoryModel[] = [];
  listOfferOcupied:Number[] = [];
  listBestOcupied:Number[] =[];
  caoruselOpcion:Number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  constructor(private _products:ProductsService,
              private _categories:CategoryService,
              private _brand:BrandService,
              private router:Router,
              private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.form =this.fb.group({
      product_image:['', Validators.required],
      category_id:['',Validators.required],
      brnad_id:['',Validators.required],
      product_name:['',Validators.required],
      product_description: ['', Validators.required],
      product_price:[0,Validators.required],
      product_stock:[1,Validators.required],
      product_offer_day:[0,Validators.required],
      product_best_seller:[0,Validators.required],
      product_offer_day_order:[0],
      product_best_seller_order:[0]
    });
    this.form.get('product_offer_day_order').disable();
    this.form.get('product_best_seller_order').disable();
  }

  goGrid(){
    this.router.navigateByUrl('dashboardProducts');
  }

  get categoryNoValida(){
      return this.form.get('category_id').invalid && this.form.get('category_id').touched ;
  }

  get brandNoValida(){
    return this.form.get('brand_id').invalid && this.form.get('brand_id').touched ;
  }

  get imageNoValido(){
    return this.form.get('product_image').invalid && this.form.get('product_image').touched ;
  }

  get nameNoValido(){
    return this.form.get('product_name').invalid && this.form.get('product_name').touched ;
  }

  get descriptionNoValido(){
     return this.form.get('product_description').invalid && this.form.get('product_description').touched ;
  }

  get precioNoValido(){
    return this.form.get('product_price').invalid && this.form.get('product_price').touched ;
  }

  get stockNoValido(){
    return this.form.get('product_stock').invalid && this.form.get('product_stock').touched ;
  }

  get offerNoValido(){
    return this.form.get('product_destacado').invalid && this.form.get('product_destacado').touched ;
  }

  get bestNoValido(){
    return this.form.get('product_best_seller').invalid && this.form.get('product_best_seller ').touched ;
  }

  selectFile(event:any){
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
    if (this.form.get('product_offer_day').value == 0){
      this.form.get('product_offer_day').setValue(0);
      this.form.get('product_offer_day').disable();
    }else{
      this.form.get('product_offer_day_order').enable();
    }

  }

  changeBest(){
    if (this.form.get('product_best_seller').value == 0){
      this.form.get('product_best_seller').setValue(0);
      this.form.get('product_best_seller').disable();
    }else{
      this.form.get('product_best_seller').enable();
    }
  }

  register(){
    console.log("hola mundo");

  }



}
