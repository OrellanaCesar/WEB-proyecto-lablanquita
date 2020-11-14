// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  configuración de localización
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsAr);

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { DataTableBrandComponent } from './components/brands/data-table-brand/data-table-brand.component';
import { CreateBrandComponent } from './components/brands/create-brand/create-brand.component';
import { DataTableCategoryComponent } from './components/categories/data-table-category/data-table-category.component';
import { DataTableProductsComponent } from './components/products/data-table-products/data-table-products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { CreateCategoryComponent } from './components/categories/create-category/create-category.component';
import { ModifyCategoryComponent } from './components/categories/modify-category/modify-category.component';
import { UpdatebrandComponent } from './components/brands/updatebrand/updatebrand.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { SearchProductsComponent } from './components/search/search-products/search-products.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CardProductComponent } from './components/search/card-product/card-product.component';
import { DataTableUserComponent } from './components/users/data-table-user/data-table-user.component';
import { RecoverPasswordComponent } from './components/users/recover-password/recover-password.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import { CreateUserAdminComponent } from './components/users/create-user-admin/create-user-admin.component';



@NgModule({
  declarations: [
  AppComponent,
  MenuComponent,
  HomeComponent,
  UbicacionComponent,
  DataTableBrandComponent,
  DataTableCategoryComponent,
  DataTableProductsComponent,
  CreateProductComponent,
  CreateCategoryComponent,
  CreateBrandComponent,
  CreateUserAdminComponent,
  DataTableCategoryComponent,
  UpdatebrandComponent,
  UpdateProductComponent,
  ShowProductComponent,
  ModifyCategoryComponent,
  SearchProductsComponent,
  ContactoComponent,
  CardProductComponent,
  DataTableUserComponent,
  RecoverPasswordComponent,
  FooterComponent,
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  DataTablesModule,
  HttpClientModule,
  ReactiveFormsModule,
  CarouselModule,
  BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
