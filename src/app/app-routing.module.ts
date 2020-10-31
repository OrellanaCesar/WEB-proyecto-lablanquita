import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';
import { DataTableCategoryComponent } from './components/categories/data-table-category/data-table-category.component';
import { DataTableProductsComponent } from './components/products/data-table-products/data-table-products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { ModifyCategoryComponent } from './components/categories/modify-category/modify-category.component';
import {UpdatebrandComponent} from './components/brands/updatebrand/updatebrand.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { SearchProductsComponent } from './components/search/search-products/search-products.component';
import { ContactoComponent } from './components/contacto/contacto.component';


const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'ubicacion' , component:UbicacionComponent},
{path:'createBrand',component:CreateBrandComponent},
{path:'createProduct',component:CreateProductComponent},
{path:'dashboardBrand' , component:DataTableBrandComponent},
{path:'dashboardCategory' , component:DataTableCategoryComponent},
{path:'dashboardProducts' , component:DataTableProductsComponent},
{path:'createCategory',component:CreateCategoryComponent},
{path:'updatebrand/:id' , component:UpdatebrandComponent},
{path:'updateProduct/:id' , component:UpdateProductComponent},
{path:'products/:id',component:ShowProductComponent},
{path:'updateCategory/:id',component:ModifyCategoryComponent},
{path:'search/:tipo/:id/:valor:',component:SearchProductsComponent},
{path:'contacto',component:ContactoComponent},
{path:'**', pathMatch:'full', redirectTo:''},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
