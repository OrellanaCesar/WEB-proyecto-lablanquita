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
import { DataTableUserComponent } from './components/users/data-table-user/data-table-user.component';
import { AuthGuard } from './guards/auth.guard';
import { ModifyUserComponent } from './components/users/modify-user/modify-user.component';
import { RecoverPasswordComponent } from './components/users/recover-password/recover-password.component';
import { UsersClientsComponent } from './components/users/users-clients/users-clients.component';
import { SendMailComponent } from './components/users/send-mail/send-mail.component';
import { CreateUserAdminComponent } from './components/users/create-user-admin/create-user-admin.component';

const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'ubicacion' , component:UbicacionComponent},
{path:'recoverPassword',component:RecoverPasswordComponent},
{path:'createBrand',component:CreateBrandComponent, canActivate:[AuthGuard]},
{path:'createProduct',component:CreateProductComponent, canActivate:[AuthGuard]},
{path:'createUserAdmin',component:CreateUserAdminComponent , canActivate:[AuthGuard]},
{path:'dashboardBrand' , component:DataTableBrandComponent, canActivate:[AuthGuard]},
{path:'dashboardCategory' , component:DataTableCategoryComponent, canActivate:[AuthGuard]},
{path:'dashboardProducts' , component:DataTableProductsComponent, canActivate:[AuthGuard]},
{path:'dashboardUsers' , component:DataTableUserComponent , canActivate:[AuthGuard]},
{path:'createCategory',component:CreateCategoryComponent, canActivate:[AuthGuard]},
{path:'updatebrand/:id' , component:UpdatebrandComponent, canActivate:[AuthGuard]},
{path:'updateProduct/:id' , component:UpdateProductComponent, canActivate:[AuthGuard]},
{path:'products/:id',component:ShowProductComponent},
{path:'updateCategory/:id',component:ModifyCategoryComponent, canActivate:[AuthGuard]},
{path:'search/:tipo/:id/:valor',component:SearchProductsComponent},
{path:'contacto',component:ContactoComponent},
{path:'clients',component:UsersClientsComponent,  canActivate:[AuthGuard]},
{path:'sendMailClients',component:SendMailComponent,  canActivate:[AuthGuard]},
{path:'updateUser',component:ModifyUserComponent},
{path:'**', pathMatch:'full', redirectTo:''},
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{ useHash:true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
