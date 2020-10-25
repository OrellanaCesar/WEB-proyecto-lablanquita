import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-table-products',
  templateUrl: './data-table-products.component.html',
  styleUrls: ['./data-table-products.component.css']
})
export class DataTableProductsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  Products:any[] = [];

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
                    data: 'product_category'
                  },
                  {
                    data: 'product_brand'
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

    // console.log("hola");

		this.router.navigateByUrl('createProduct');
	}

  deleteProduct(id:number){
    console.log(id);


	}

  update(id:number){
    console.log(id);

  }

}
