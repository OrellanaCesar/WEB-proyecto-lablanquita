import { Component, OnInit, HostListener } from '@angular/core';
import { BrandModel } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryModel } from '../../../models/category.model';
import { DataServicesService } from 'src/app/services/data-services.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  formSearch: FormGroup;
  scrHeight:any;
  scrWidth:any;
  listBrands : BrandModel [] = [];
  listCategories : CategoryModel [] = [];

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  constructor( private _brand:BrandService,
               private router:Router,
               private _category:CategoryService,
               public _data:DataServicesService,
               private fb:FormBuilder) {
    this.getScreenSize();
    this.getBrands();
    this.getCategories();
    this._data.listBrands = this.listBrands;
    this._data.listCategories = this.listCategories;
    this.createFormSearch();
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

}
