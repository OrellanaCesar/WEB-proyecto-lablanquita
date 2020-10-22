import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';

const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'ubicacion' , component:UbicacionComponent},
{path:'**', pathMatch:'full', redirectTo:''},
{path:'createBrand',component:CreateBrandComponent},
{path:'dashboardBrand' , component:DataTableBrandComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
