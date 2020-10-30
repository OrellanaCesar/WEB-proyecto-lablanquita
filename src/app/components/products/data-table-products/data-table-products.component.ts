import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { ApiSettigns } from 'src/app/API/API.settings';

@Component({
  selector: 'app-data-table-products',
  templateUrl: './data-table-products.component.html',
  styleUrls: ['./data-table-products.component.css']
})
export class DataTableProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  Products:any[] = [];
  url_image :string = ApiSettigns.url_image;

  constructor(private _products:ProductsService,
    private router:Router) {

  }

  ngOnInit(): void {
    /*Crea el dataTable con sus campos*/
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide:true,
      processing: true,

      ajax:(dataTablesParameters :any,callback) => {
        that._products.getDataTables(dataTablesParameters)
        .subscribe(resp => {
          that.Products = resp.data;
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data : []
          })
        }
        ,(error:any) =>{
          this.Products = [];
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
        data:'product_id'
      },
      {
        data: 'product_name'
      },
      {
        data: 'category_name'
      },
      {
        data: 'brand_name'
      },
      {
        data: 'product_price'
      },
      {
        data: 'product_stock'
      },
      {
        data: 'product_image'
      },
      {
        data: 'action'
      }
      ],
      responsive:true,
    };
  }

  createProduct(){

		/*Se va a la vista de crear un producto, asociado al componete de creacion
    de producto
		Parametros:no hay
		*/

		this.router.navigateByUrl('createProduct');
	}

  deleteProduct(id:number){

    /*
    Esta funcion elimina un producto atravez de una
    petion a la API. Usando el id para eliminar.
    parameter:id del producto a eliminar.
    return: no hay.
    */

    this._products.deleteProduct(id)
    .subscribe((resp:any) => {
      this.getProducts();
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
        title: 'Se elimino el producto con exito'
      });


    },(error:any) =>{
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
        title: 'Lo sentimos no se pudo eliminar el product correctamente'
      });
    });

  }

  getProducts(){

    /*
    Esta funcion obtienes todos los productos consumiendo
    de la API.
    parameter: no hay.
    return:no hay.
    */

    this._products.getProductsD()
    .subscribe((resp:any) => {
      this.Products = resp;
    },(error:any) => {
      this.Products = [];
    })
  }

  update(id:number){

    /*
    Se va a la vista de modificar un producto, asociado al componete
    de modificacion del producto
		parameter : id del porducto a modificar.
    return: no hay.
		*/

    this.router.navigateByUrl(`updateProduct/${id}`);

  }

}
