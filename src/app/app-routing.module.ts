import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';
import { DataTableCategoryComponent } from './components/categories/data-table-category/data-table-category.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';

const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'ubicacion' , component:UbicacionComponent},
{path:'createBrand',component:CreateBrandComponent},
{path:'dashboardBrand' , component:DataTableBrandComponent},
{path:'dashboardCategory' , component:DataTableCategoryComponent},
{path:'createCategory',component:CreateCategoryComponent},
{path:'**', pathMatch:'full', redirectTo:''},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
