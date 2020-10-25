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


const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'ubicacion' , component:UbicacionComponent},
{path:'createBrand',component:CreateBrandComponent},
{path:'createProduct',component:CreateProductComponent},
{path:'dashboardBrand' , component:DataTableBrandComponent},
{path:'dashboardCategory' , component:DataTableCategoryComponent},
{path:'dashboardProducts' , component:DataTableProductsComponent},
{path:'createCategory',component:CreateCategoryComponent},
{path:'**', pathMatch:'full', redirectTo:''},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
